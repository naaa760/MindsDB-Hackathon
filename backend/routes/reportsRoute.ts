import { Router, Request, Response } from 'express';
import generateHealthReport from '../utils/getResponse';
import HealthPulseUserModel from '../models/userModel';
import HealthReportModel from '../models/healthReportModel';

const healthReportRouter = Router();

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
