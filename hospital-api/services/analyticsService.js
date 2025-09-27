import Patient from "../modals/patient.js";

const getAnalytics = async (recentLimit = 5) => {
  const totalPatients = await Patient.countDocuments();

  const ageGroups = {
    "<18": await Patient.countDocuments({ age: { $lt: 18 } }),
    "18-40": await Patient.countDocuments({ age: { $gte: 18, $lte: 40 } }),
    "40-60": await Patient.countDocuments({ age: { $gt: 40, $lte: 60 } }),
    "60+": await Patient.countDocuments({ age: { $gt: 60 } }),
  };

  const patientsPerDoctor = await Patient.aggregate([
    { $group: { _id: "$doctor", count: { $sum: 1 } } },
    {
      $lookup: {
        from: "doctors",
        localField: "_id",
        foreignField: "_id",
        as: "doctor",
      },
    },
    { $unwind: "$doctor" },
    { $project: { doctor: "$doctor.name", count: 1 } },
  ]);

  const recentPatients = await Patient.find()
    .populate("doctor", "name email")
    .sort({ createdAt: -1 })
    .limit(recentLimit);

  return {
    totalPatients,
    ageGroups,
    patientsPerDoctor,
    recentPatients,
  };
};

export default { getAnalytics };
