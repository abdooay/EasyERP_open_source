var express = require('express');
var router = express.Router();
var WorkflowHandler = require('../handlers/workflow');
var authStackMiddleware = require('../helpers/checkAuth');
var MODULES = require('../constants/modules');

module.exports = function (models, event) {
    'use strict';
    var handler = new WorkflowHandler(models, event);
    var moduleId = MODULES.WORKFLOWS;
    var accessStackMiddleware = require('../helpers/access')(moduleId, models);

    /**
     *@api {get} /workflows/ Request Workflows
     *
     * @apiVersion 0.0.1
     * @apiName getWorkflows
     * @apiGroup Workflow
     *
     * @apiParam (?Field=value) {Number} mid=39
     * @apiParam (?Field=value) {String} id
     *
     * @apiSuccess {Object} Workflows
     * @apiSuccessExample Success-Response:
HTTP/1.1 200 OK
{
    "data": [
        {
            "_id": "528ce51cf3f67bc40b000015",
            "__v": 0,
            "attachments": [],
            "color": "#2C3E50",
            "name": "Initial Qualification",
            "sequence": 7,
            "status": "New",
            "wId": "Applications",
            "wName": "application",
            "source": "application",
            "targetSource": [
                "application"
            ],
            "visible": true
        },
        ...
    ]
}
     */
    router.get('/', authStackMiddleware, handler.get);

    /**
     *@api {get} /workflows/relatedStatus/ Request RelatedStatus
     *
     * @apiVersion 0.0.1
     * @apiName getRelatedStatus
     * @apiGroup Workflow
     *
     * @apiParam (?Field=value) {Number} mid=39
     *
     * @apiSuccess {Object} RelatedStatus
     * @apiSuccessExample Success-Response:
HTTP/1.1 200 OK
{
    "data": [
        {
            "_id": 1,
            "attachments": [],
            "status": "New"
        },
        {
            "_id": 2,
            "attachments": [],
            "status": "In Progress"
        },
        {
            "_id": 3,
            "attachments": [],
            "status": "Pending"
        },
        {
            "_id": 4,
            "attachments": [],
            "status": "Done"
        },
        {
            "_id": 5,
            "attachments": [],
            "status": "Cancelled"
        }
    ]
}
     */
    router.get('/relatedStatus', authStackMiddleware, handler.relatedStatus);
    router.get('/getWorkflowsForDd', authStackMiddleware, handler.getWorkflowsForDd);

    /**
     *@api {get} /workflows/getFirstForConvert/ Request FirstWorkflowForConvert
     *
     * @apiVersion 0.0.1
     * @apiName getFirstWorkflowForConvert
     * @apiGroup Workflow
     *
     * @apiParam (?Field=value) {String} wId="Purchase Order"
     * @apiParam (?Field=value) {String} source="purchase"
     * @apiParam (?Field=value) {String} targetSource="quotation"
     *
     * @apiSuccess {Object} FirstWorkflowForConvert
     * @apiSuccessExample Success-Response:
HTTP/1.1 200 OK
{
    "_id": "5555bf276a3f01acae0b5560",
    "color": "#2C3E50",
    "name": "Not Ordered",
    "sequence": 3,
    "status": "New",
    "wId": "Purchase Order",
    "wName": "order",
    "source": "purchase",
    "targetSource": [
        "quotation"
    ],
    "visible": true
}
     */
    router.get('/getFirstForConvert', handler.getFirstForConvert);
    router.get('/fetch', handler.fetch);

    router.post('/', authStackMiddleware, accessStackMiddleware, handler.create);

    /**
     *@api {put} /workflows/:id Request for fully updating Workflow
     *
     * @apiVersion 0.0.1
     * @apiName updateFullWorkflow
     * @apiGroup Workflow
     *
     * @apiParam {String} id Unique id of Workflow
     * @apiParamExample {json} Request-Example:
{
    "_id": "528ce51cf3f67bc40b000015",
    "__v": 0,
    "attachments": [
    
    ],
    "color": "#2C3E50",
    "name": "Initial Qualification",
    "sequence": 7,
    "status": "In Progress",
    "wId": "Applications",
    "wName": "application",
    "source": "application",
    "targetSource": [
    "application"
    ],
    "visible": true
}
     *
     * @apiSuccess {Object} Status
     * @apiSuccessExample Success-Response:
HTTP/1.1 200 OK
{
    "success": "WorkFlow update success"
}
     */
    router.put('/:id', authStackMiddleware, accessStackMiddleware, handler.updateWorkflow);

    /**
     *@api {patch} /workflows/:id Request for partly updating Workflow
     *
     * @apiVersion 0.0.1
     * @apiName updateWorkflow
     * @apiGroup Workflow
     *
     * @apiParam {String} id Unique id of Workflow
     * @apiParamExample {json} Request-Example:
{
    "sequenceStart": 7,
    "wId": "Applications",
    "sequence": 6
}
     *
     * @apiSuccess {Object} Status
     * @apiSuccessExample Success-Response:
HTTP/1.1 200 OK
{
    "success": "WorkFlow update success"
}
     */
    router.patch('/:id', authStackMiddleware, accessStackMiddleware, handler.updateOnlySelectedFields);

    /**
     *@api {delete} /workflows/:id Request for deleting Workflow
     *
     * @apiVersion 0.0.1
     * @apiName deleteWorkflow
     * @apiGroup Workflow
     *
     * @apiParam {String} id Unique id of Workflow
     *
     * @apiSuccess {Object} Status
     * @apiSuccessExample Success-Response:
HTTP/1.1 200 OK
{
    "success":"workflow removed"
}
     */
    router.delete('/:id', authStackMiddleware, accessStackMiddleware, handler.remove);

    return router;
};
