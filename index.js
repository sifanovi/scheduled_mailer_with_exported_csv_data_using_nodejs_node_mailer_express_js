var cron = require("node-cron");
var express = require("express");
var {Parser} = require("json2csv");
var Promise = require('bluebird');
var fs = require("fs");
var moment = require("moment");
var route = express.Router();
var DB = require("./models/index");
var investigations = DB.investigations;
var patients = DB.patients
var sequelize = DB.Sequelize;
var or = sequelize.Op.or;
var nodeMailer = require('nodemailer');
var path = require('path');
var bodyParser = require("body-parser");
route.use(bodyParser.json()); // for parsing application/json
route.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
var date = new Date();
app = express();
//const fields = ['id', 'date', 'time','phoneNumber', 'firstName','surName','dob','dateOfFirstSymptom','initialSymptom','spo2','temperature','numberofbreaths','pulserate','bloodPressureSystolic','bloodPressureDiastolic','persistentCough','isItDry','colorOfSpeutum','areYouOnOxygen','isYourUrineDark','foodInTheHouse','haveAcarer','status'];
const fields = ['Id', 'Date', 'Time', 'Phone Number', 'First Name', 'SurName', 'Dob', 'Date Of First Symptom', 'Initial Symptom', 'Spo2', 'Temperature', 'Number Of Breaths 60s', 'Pulserate', 'Blood Pressure Systolic', 'Blood Pressure Diastolic', 'Persistent Cough', 'Is It Dry', 'Color Of Speutum', 'Are You On Oxygen', 'Is Your Urine Dark', 'Food In The House', 'Have A carer', 'Status'];
const opts = {fields};
var investigationlist = [];
var investigationItem = {};
cron.schedule(" 05 15 * * *", function () {
    investigationlist = [];
    return investigations.findAll({
        raw: true,
        as: "investigations",
        include: [{
            as: "patient",
            model: patients
        }]
    }).then(function (result) {


        result.forEach(function (investigation) {
            investigationItem = {};
            investigationItem['Id'] = investigation.patient_id;
            investigationItem['Date'] = moment(investigation.createdAt).format('DD-MM-YYYY');
            investigationItem['Time'] = moment(investigation.createdAt).format('hh:mm');
            investigationItem['Phone Number'] = investigation['patient.phone'];
            investigationItem['First Name'] = investigation['patient.first_name'];
            investigationItem['SurName'] = investigation['patient.sur_name'];
            investigationItem['Dob'] = investigation['patient.date_of_birth'];
            investigationItem['Date Of First Symptom'] = investigation['patient.start_date_of_symptoms'];
            investigationItem['Initial Symptom'] = investigation.symptoms ? investigationItem['Initial Symptom'] = investigation.symptoms : investigationItem['Initial Symptom'] = investigation['patient.symptoms'];
            investigationItem['Spo2'] = investigation.pulse_oximeter;
            investigationItem['Temperature'] = investigation.temperature;
            investigationItem['Number Of Breaths 60s'] = investigation.breaths;
            investigationItem['Pulserate'] = investigation.pulse_rate;
            investigationItem['Blood Pressure Systolic'] = investigation.blood_pressure_systolic;
            investigationItem['Blood Pressure Diastolic'] = investigation.blood_pressure_diastolic;
            investigationItem['Persistent Cough'] = investigation.persistent_cough;
            investigationItem['Is It Dry'] = investigation.discoloured_phlegm ? investigation.discoloured_phlegm : 'n/a';
            investigationItem['Color Of Speutum'] = investigation.discoloured_phlegm;
            investigationItem['Are You On Oxygen'] = investigation.oxygen;
            investigationItem['Is Your Urine Dark'] = investigation.urine;
            investigationItem['Food In The House'] = investigation.food_status;
            investigationItem['Have A carer'] = investigation.carer_status;
            investigationItem['Status'] = investigation.patient_status;

            investigationlist.push(investigationItem);
            //console.log(investigationItem);

        });


        parser = new Parser(opts);
        const csv = parser.parse(investigationlist);


        filename = date.getFullYear() + date.getMonth() + date.getDay() + date.getTime() + '.csv';
        console.log(investigationlist.length);
        fs.writeFile('csvs/' + filename, csv, function (err) {
            if (err) {
                console.log(err);
            } else {
                var transporter = nodeMailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        user: 'sifancovid@gmail.com',
                        pass: 'covid19_sifan'
                    }
                });
                const mailOptions = {
                    from: 'sifancovid@gmail.com', // sender address
                    to: 'sifanduronto@gmail.com', // list of receivers
                    subject: 'CSV report for daily investigations', // Subject line
                    html: '<p>Your Daily report is here.Please check in the attachments</p>',// plain text body,
                    attachments: [{
                        filename: filename,
                        path: 'csvs/' + filename
                    }],
                }
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err)
                        console.log(err)
                    else
                        console.log(info);
                });
            }
        });

    });

});

app.get("/", function (req, res) {
    investigationlist = [];
    return investigations.findAll({
        raw: true,
        as: "investigations",
        include: [{
            as: "patient",
            model: patients
        }]
    }).then(function (result) {
        result.forEach(function (investigation) {
            investigationItem = {};
            investigationItem['Id'] = investigation.patient_id;
            investigationItem['Date'] = moment(investigation.createdAt).format('DD-MM-YYYY');
            investigationItem['Time'] = moment(investigation.createdAt).format('hh:mm');
            investigationItem['Phone Number'] = investigation['patient.phone'];
            investigationItem['First Name'] = investigation['patient.first_name'];
            investigationItem['SurName'] = investigation['patient.sur_name'];
            investigationItem['Dob'] = investigation['patient.date_of_birth'];
            investigationItem['Date Of First Symptom'] = investigation['patient.start_date_of_symptoms'];
            investigationItem['Initial Symptom'] = investigation.symptoms ? investigationItem['Initial Symptom'] = investigation.symptoms : investigationItem['Initial Symptom'] = investigation['patient.symptoms'];
            investigationItem['Spo2'] = investigation.pulse_oximeter;
            investigationItem['Temperature'] = investigation.temperature;
            investigationItem['Number Of Breaths 60s'] = investigation.breaths;
            investigationItem['Pulserate'] = investigation.pulse_rate;
            investigationItem['Blood Pressure Systolic'] = investigation.blood_pressure_systolic;
            investigationItem['Blood Pressure Diastolic'] = investigation.blood_pressure_diastolic;
            investigationItem['Persistent Cough'] = investigation.persistent_cough;
            investigationItem['Is It Dry'] = investigation.discoloured_phlegm ? investigation.discoloured_phlegm : 'n/a';
            investigationItem['Color Of Speutum'] = investigation.discoloured_phlegm;
            investigationItem['Are You On Oxygen'] = investigation.oxygen;
            investigationItem['Is Your Urine Dark'] = investigation.urine;
            investigationItem['Food In The House'] = investigation.food_status;
            investigationItem['Have A carer'] = investigation.carer_status;
            investigationItem['Status'] = investigation.patient_status;

            investigationlist.push(investigationItem);
            //console.log(investigationItem);

        });


        parser = new Parser(opts);
        const csv = parser.parse(investigationlist);


        filename = date.getFullYear() + date.getMonth() + date.getDay() + date.getTime() + '.csv';
        console.log(investigationlist.length);
        fs.writeFile('csvs/' + filename, csv, function (err) {
            if (err) {
                console.log(err);
            } else {
                res.download(path.join(__dirname, "csvs/" + filename));
            }
        });

    });
})
app.listen("3128");