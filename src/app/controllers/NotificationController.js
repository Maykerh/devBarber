import Notification from '../schemas/Notification';
import User from '../models/User';
import * as Yup from 'yup';
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import File from '../models/File';
import { Op } from 'sequelize';
import { start } from 'repl';

class ScheduleController {
    async index(req, res) {
        const isProvider = await User.findOne({
            where: { id: req.userId, provider: true }
        });

        if (!isProvider) {
            return res.status(401).json({
                error: 'Only providers can load notifications'
            });
        }

        const notifications = await Notification.find({
            user: req.userId
        })
            .sort({ createdAt: 'desc' })
            .limit(20);

        return res.json(notifications);
    }

    async update(req, res) {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );

        return res.json(notification);
    }
}
export default new ScheduleController();
