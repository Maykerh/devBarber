import Appointment from '../models/Appointment';
import User from '../models/User';
import * as Yup from 'yup';
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import File from '../models/File';
import { Op } from 'sequelize';
import { start } from 'repl';

class ScheduleController {
    async index(req, res) {
        const chechUserProvider = await User.findOne({
            where: { id: req.userId, provider: true }
        });

        if (!chechUserProvider) {
            return res.status(401).json({ error: 'User must be a provider' });
        }

        const { date } = req.query;
        const parsedDate = parseISO(date);

        const appointments = await Appointment.findAll({
            where: {
                provider_id: req.userId,
                canceled_at: null,
                date: {
                    [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)]
                }
            }
        });

        return res.json(appointments);
    }
}
export default new ScheduleController();
