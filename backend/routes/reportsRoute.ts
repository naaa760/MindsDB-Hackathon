import { Router, Request, Response } from 'express';
import generateHealthReport from '../utils/getResponse';
import HealthPulseUserModel from '../models/userModel';
import HealthReportModel from '../models/healthReportModel';

const healthReportRouter = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     HealthReport:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - age
 *         - sex
 *         - occupation
 *         - symptoms
 *         - timeOfYear
 *         - places
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The user's email address
 *         age:
 *           type: number
 *           description: The age of the user
 *         sex:
 *           type: string
 *           description: The user's gender
 *         occupation:
 *           type: string
 *           description: The user's occupation
 *         symptoms:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of symptoms
 *         timeOfYear:
 *           type: string
 *           description: The season or time of year
 *         places:
 *           type: array
 *           items:
 *             type: string
 *           description: The places the user has visited
 * 
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - age
 *         - sex
 *         - occupation
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The user's email
 *         age:
 *           type: number
 *           description: The age of the user
 *         sex:
 *           type: string
 *           description: The gender of the user
 *         occupation:
 *           type: string
 *           description: The user's occupation
 */

/**
 * @swagger
 * /get-report:
 *   post:
 *     summary: Generate a health report for a user
 *     description: Generates a health report for a user based on input details like name, age, symptoms, etc., and saves it to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HealthReport'
 *     responses:
 *       200:
 *         description: The generated health report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 report: { healthStatus: 'Good', suggestions: ['Rest more', 'Stay hydrated']}
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
healthReportRouter.post('/get-report', async (req: Request, res: Response) => {
  const { name, email, age, sex, occupation, symptoms, timeOfYear, places } = req.body;

  // Input validation
  if (!name || !email || !age || !sex || !symptoms || !timeOfYear || !places) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Generate the health report
    const report = await generateHealthReport({
      name: name,
      age: age,
      sex: sex,
      symptoms: symptoms,
      location: places.join(", "),
      timeOfYear: timeOfYear,
      occupation: occupation,
    });

    // Check if user already exists in the database
    let user = await HealthPulseUserModel.findOne({ email: email }).exec();

    if (!user) {
      // Create a new user instance if not found
      user = new HealthPulseUserModel({
        name: name,
        email: email,
        age: age,
        sex: sex,
        occupation: occupation,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Save the user to the database
      await user.save();
    }

    // Create and save the health report with the user's ID as a reference
    const newReport = new HealthReportModel({
      user: user._id,
      ...report,  // Include all the generated health report data
      dateAdded: new Date(),
    });

    await newReport.save();

    // Send the generated health report as a response
    res.json(report);

    console.log('User and health report saved successfully');
  } catch (error) {
    if (!res.headersSent) {
      const typedError = error as Error;
      res.status(500).json({ error: typedError.message });
    }
    console.error('Error saving user or health report:', error);
  }
});

/**
 * @swagger
 * /get-report:
 *   get:
 *     summary: Retrieve user health reports
 *     description: Retrieves all health reports for a given user based on their email.
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         description: The email of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The user's health reports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 reports:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: The health report data
 *       400:
 *         description: Invalid or missing email query parameter
 *       404:
 *         description: User or reports not found
 *       500:
 *         description: Server error
 */
healthReportRouter.get('/get-report', async (req: Request, res: Response) => {
  const { email } = req.query;

  // Validate email
  if (typeof email !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing email query parameter' });
  }

  try {
    // Find user by email
    const user = await HealthPulseUserModel.findOne({ email: email }).exec();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch all health reports associated with the user
    const reports = await HealthReportModel.find({ user: user._id }).sort({ createdAt: -1 }).exec();

    res.json({ user, reports });
  } catch (error) {
    if (!res.headersSent) {
      const typedError = error as Error;
      res.status(500).json({ error: typedError.message });
    }
    console.error('Error retrieving user or health reports:', error);
  }
});

export default healthReportRouter;
