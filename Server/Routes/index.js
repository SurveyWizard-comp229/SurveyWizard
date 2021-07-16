"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const survey_1 = __importDefault(require("../Models/survey"));
let QuestionObject = {};
let currentID = "";
router.get("/", (req, res, next) => {
    res.render("../Views/Content/index.ejs", {
        title: "Home",
    });
});
router.get("/explorePage", (req, res, next) => {
    res.render("../Views/Explore/explore.ejs", {
        title: "Home",
    });
});
router.get("/mySurveys", (req, res, next) => {
    res.render("../Views/mySurveys/mySurveys.ejs", {
        title: "Home",
    });
});
router.get("/createSurvey", (req, res, next) => {
    res.render("../Views/Survey/createSurvey/createSurvey.ejs", {
        title: "Home",
    });
});
router.post("/createSurvey", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("THIS IS THE POST");
    try {
        console.log(req.body);
        let surveyName = req.body.title;
        let surveyType = req.body.surveyType;
        let publicValue = req.body.publicValue;
        let format = "Some surveyType";
        let newSurvey = yield survey_1.default.create({
            "surveyName": surveyName,
            "surveyCategory": surveyType,
            "publicValue": publicValue,
            "surveyType": format
        });
        console.log("NEW SURVEY CREATED", newSurvey.id);
        currentID = newSurvey.id;
        console.log("CURRENT ID", currentID);
        res.redirect('/surveyEditor');
    }
    catch (error) {
        console.log("ERROR", error);
    }
}));
router.get("/surveyEditor", (req, res, next) => {
    res.render("../Views/Survey/surveyEditor/surveyEditor.ejs", {
        title: "Home",
    });
});
router.post("/surveyEditor", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    console.log("post for edit");
    try {
        res.redirect('/surveyEditor');
        let QuestionTitle = req.body.questonTitle;
        let surveyQuestionType = req.body.surveyQuestionType;
        const buildMap = (QuestionTitle, surveyQuestionType) => {
            const map = new Map();
            for (let i = 0; i < QuestionTitle.length; i++) {
                map.set(QuestionTitle[i], surveyQuestionType[i]);
            }
            ;
            return map;
        };
        let SurveyQuestions = [...buildMap(QuestionTitle, surveyQuestionType)];
        let name = "STRING";
        yield survey_1.default.findOneAndUpdate({ _id: currentID }, { $push: { questions: SurveyQuestions } });
    }
    catch (error) {
    }
}));
//# sourceMappingURL=index.js.map