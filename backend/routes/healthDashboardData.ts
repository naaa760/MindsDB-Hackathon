import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import HeaalthDashboardDataModel, { HeaalthDashboardData } from '../models/healthData';
import HealthPulseUserModel from '../models/userModel';
import healthReportRouter from './reportsRoute';

const healthDashboardRouter = Router();

healthDashboardRouter.post('/dashboard-details', async (req: Request, res: Response) => {
  const { email, date, steps, sleep, weight, calories, waterIntake, activeMinutes } = req.body;

  if (!email || !date || !steps || !sleep || !weight || !calories || !waterIntake || !activeMinutes) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const user = await HealthPulseUserModel.findOne({ email: email }).exec()
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const healthData: HeaalthDashboardData = new HeaalthDashboardDataModel({
      email: email,
      date: date,
      steps: steps,
      sleep: sleep,
      weight: weight,
      calories: calories,
      waterIntake: waterIntake,
      activeMinutes: activeMinutes,
    })

    const savedHealthData = await healthData.save()
    user.healthData.push(savedHealthData._id as mongoose.Types.ObjectId);
    console.log('Added the health dashboard data')
  } catch (error) {
    if (!res.headersSent) {
      const typedError = error as Error;
      res.status(500).json({ error: typedError.message })
    }
    console.error('Could not add the health dashboard data', error)
  }
})

healthReportRouter.get('/dashboard-details', async (req: Request, res: Response) => {
  const { email } = req.query

  if (typeof email !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing email in query parameter' })
  }
  try {
    const healthData = await HeaalthDashboardDataModel.findOne({ email: email }).exec()
    if (!healthData) {
      return res.status(404).json({ error: 'Health Data not found' })
    }
    res.json(healthData)
  } catch (error) {
    if (!res.headersSent) {
      const typedError = error as Error
      res.status(500).json({ error: typedError.message })
    }
    console.error('Error retrieving the HealthData', error)
  }

})

export default healthDashboardRouter;
