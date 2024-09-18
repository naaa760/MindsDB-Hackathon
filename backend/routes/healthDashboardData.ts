import { Router, Request, Response } from 'express';
import HealthDashboardDataModel, { HealthDashboardData } from '../models/healthDashboardDataModel';
import HealthPulseUserModel from '../models/userModel';

const healthDashboardRouter = Router();

/**
 * @swagger
 * /dashboard-details:
 *   post:
 *     summary: Add health dashboard data for a user
 *     tags: [HealthDashboard]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - date
 *               - steps
 *               - sleep
 *               - weight
 *               - calories
 *               - waterIntake
 *               - activeMinutes
 *             properties:
 *               email:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               steps:
 *                 type: number
 *               sleep:
 *                 type: number
 *               weight:
 *                 type: number
 *               calories:
 *                 type: number
 *               waterIntake:
 *                 type: number
 *               activeMinutes:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successfully added health dashboard data
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

// Optimize POST route for adding health dashboard data
healthDashboardRouter.post('/dashboard-details', async (req: Request, res: Response) => {
  const { email, date, steps, sleep, weight, calories, waterIntake, activeMinutes } = req.body;

  if (!email || !date || !steps || !sleep || !weight || !calories || !waterIntake || !activeMinutes) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Parallelize user fetching and checking
    const userPromise = HealthPulseUserModel.findOne({ email }).exec();

    // Resolve user query
    const user = await userPromise;

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create and insert health data
    const healthData: HealthDashboardData = new HealthDashboardDataModel({
      user: user._id,
      email,
      date: new Date(),
      steps,
      sleep,
      weight,
      calories,
      waterIntake,
      activeMinutes,
    });

    // Save the document
    await healthData.save();

    console.log('Added the health dashboard data');
    return res.status(201).json({ message: 'Health data added successfully' });

  } catch (error) {
    if (!res.headersSent) {
      const typedError = error as Error;
      res.status(500).json({ error: typedError.message });
    }
    console.error('Could not add the health dashboard data', error);
  }
});


/**
 * @swagger
 * /dashboard-details:
 *   get:
 *     summary: Get health dashboard data for a user by email
 *     tags: [HealthDashboard]
 *     parameters:
 *       - name: email
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: User email address
 *     responses:
 *       200:
 *         description: Successfully retrieved health data
 *       400:
 *         description: Invalid or missing email in query parameter
 *       404:
 *         description: Health data not found
 *       500:
 *         description: Error retrieving health data
 */
// Optimize GET route for fetching health dashboard data
healthDashboardRouter.get('/dashboard-details', async (req: Request, res: Response) => {
  const { email } = req.query;

  if (typeof email !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing email in query parameter' });
  }

  try {
    // Fetch data with lean queries (without mongoose document overhead)
    const healthData = await HealthDashboardDataModel.find({ email })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    if (!healthData.length) {
      return res.status(404).json({ error: 'Health Data not found' });
    }

    res.json(healthData);

  } catch (error) {
    if (!res.headersSent) {
      const typedError = error as Error;
      res.status(500).json({ error: typedError.message });
    }
    console.error('Error retrieving the HealthData', error);
  }
});

export default healthDashboardRouter;
