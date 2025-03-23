import mongoose from "mongoose";

const subsriptionsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription Name is required'],
        trim: true,
        minLegth: 2,
        maxLegth: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: 0,
    },
    currency: {
        type: String,
        enum: ['USD', "EUR"],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
        type: String,
        enum: ["sport", 'news', 'enternainment', 'lifestyle', 'tech'],
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancel', 'expired'],
        defauld: 'active'
    }, 
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value > this.startDate, 
            message: 'Start date'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, {timestamps: true})

subsriptionsSchema.pre('save', function (next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.renewalDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);

        if (this.renewalDate < new Date()) {
            this.status = 'expired';
        }

        next()
    }
})

const Subscription = mongoose.model('Subscription', subsriptionsSchema);

export default Subscription;