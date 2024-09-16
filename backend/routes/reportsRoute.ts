import { Router, Request, Response } from 'express';
import generateHealthReport from '../utils/getResponse';
import { HealthPulseUser } from '../models/userModel';

const router = Router()

router.post('/api/get-report', async (req: Request, res: Response) => {
  try {
    const { name, email, age, sex, occupation, symptoms, timeOfYear, places } = req.body;
    const user = new HealthPulseUser({
      name,
      email,
      age,
      sex,
      occupation,
      symptoms,
      timeOfYear,
      places,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    const result = await generateHealthReport({
      age,
      sex,
      symptoms,
      location,
      timeOfYear,
      occupation,
    })
    res.json(result)
    await user.save()
    console.log('Added the user')
  } catch (error) {
    console.error('Error Creating User and Saving the response', error)
  }
})

