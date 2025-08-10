const express = require('express')
const router = express.Router()
const prefController = require('../controllers/preferencesController')

router.route('/').get(prefController.getAllPrefrences)
router.route('/everything').put(prefController.everythingAsPrefrences)
router.route('/topHeadlines').put(prefController.topHeadlinesAsPrefrences)
router.route('/sources').put(prefController.SourceAsPrefrences)


module.exports = router