const Transporter = require("./sendEmail");
const node_cron = require("node-cron");
const Model = require("./model");


const fetchBirthdays = async(req, res) => {
    try {
        const date = new Date(
          new Date().toLocaleString("en-US", { timeZone: "Africa/Lagos" }));
        const month = date.getMonth() + 1;
        const day = date.getDate();

          const fetchBirthday = await Model.aggregate([
            {
              $addFields: {
                dobParts: {
                  $dateToParts: { date: "$dob", timezone: "Africa/Lagos" },
                },
              },
            },
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$dobParts.month", month] },
                    { $eq: ["$dobParts.day", day] },
                  ],
                },
              },
            },
          ]);

          if (!fetchBirthday || fetchBirthday.length === 0) {
            console.log("No birthdays today.");
            return;
          }

        for(const user of fetchBirthday) {
            let reminderEmail = {
              from: `"X Customer Services" <${process.env.EMAIL_USER}>`,
              to: user.email,
              subject: "🎉Birthday Reminder🎉",
              text: `Happy Birthday to you ${user.username}, have a lovely birthday today, You are loved❤️!`,
            };
            await Transporter.transporter.sendMail(reminderEmail);
            console.log("email sent successfully")
        }
    }catch(error){
        res.status(500).json({message: "Internal server error", error: error.message});
        console.error(`Unable to send email, ${error}`)
    }
};

node_cron.schedule("0 23 * * *", () => { 
    fetchBirthdays()
}, {timezone: "Africa/Lagos"});









