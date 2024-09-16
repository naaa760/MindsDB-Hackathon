import { Router, Request, Response } from 'express';
import generateHealthReport from '../utils/getResponse';
import HealthPulseUserModel from '../models/userModel';

const healthReportRouter = Router();

healthReportRouter.post('/get-report', async (req: Request, res: Response) => {
  const { name, email, age, sex, occupation, symptoms, timeOfYear, places } = req.body;

  // Input validation
  if (!name || !email || !age || !sex || !symptoms || !timeOfYear || !places) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Generate the health report
    const result = await generateHealthReport({
      name: name,
      age: age,
      sex: sex,
      symptoms: symptoms,
      location: places.join(", "),
      timeOfYear: timeOfYear,
      occupation: occupation,
    });

    // Create a new user instance
    const user = new HealthPulseUserModel({
      name: name,
      email: email,
      age: age,
      sex: sex,
      occupation: occupation,
      symptoms: symptoms,
      timeOfYear: timeOfYear,
      places: places,
      healthReports: [result], // Add the health report to the healthReports field
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Save user to the database
    await user.save();

    // Send the health report response
    if (!res.headersSent) {
      res.json(result);
    }

    console.log('Added the user and sent the health report');
  } catch (error) {
    // Handle errors and send an error response
    if (!res.headersSent) {
      const typedError = error as Error;
      res.status(500).json({ error: typedError.message });
    }
    console.error('Error Creating User and Saving the response:', error);
  }
});

healthReportRouter.get('/get-report', async (req: Request, res: Response) => {
  const { email } = req.query;
  // Validate email
  if (typeof email !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing email query parameter' })
  }

  try {
    // Find User by email
    const user = await HealthPulseUserModel.findOne({ email: email }).exec()

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user)
  } catch (error) {
    if (!res.headersSent) {
      const typedError = error as Error
      res.status(500).json({ error: typedError.message })
    }
    console.error('Error retrieving User Data', error)
  }
})

export default healthReportRouter;
