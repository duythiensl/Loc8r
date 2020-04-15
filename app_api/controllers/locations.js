'use strict';
let mongoose = require('mongoose');
let theEarth = (function () {
    let earthRadius = 6371; //km
    let getDistanceFromRads = function (rads) {
        return parseFloat(rads * earthRadius);
    };
    let getRadsFromDistance = function (distance) {
        return parseFloat(distance / earthRadius);
    };
    return {
        getDistanceFromRads: getDistanceFromRads,
        getRadsFromDistance: getRadsFromDistance
    };
}());


let Loc = mongoose.model('Location');
let sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
module.exports.locationsCreate = function (req, res) {
    try {
        let options = {
            name: req.body.name,
            address: req.body.address,
            facilities: req.body.facilities.split(","),
            coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
            openingTimes: [{
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1,
            }, {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2,
            }]
        };

        Loc.create(options, function (err, location) {
            if (err) {
                sendJsonResponse(res, 400, err);
            } else {
                sendJsonResponse(res, 201, location);
            }
        });
    } catch (error) {
        console.log(error);
    }

};

module.exports.locationsList = function (req, res) {
    try {
        Loc
            .find()
            .exec(function (err, results) {
                let locations = [];
                if (err) {
                    sendJsonResponse(res, 404, err);
                }
                else {
                    results.forEach(doc => {
                        locations.push({
                            coords:
                            {
                                lng: doc.coords[0],
                                lat: doc.coords[1],
                            },
                            name: doc.name,
                            address: doc.address,
                            rating: doc.rating,
                            facilities: doc.facilities,
                            _id: doc._id
                        });
                    });
                    sendJsonResponse(res, 200, locations);
                }
            });
    } catch (error) {
        sendJsonResponse(res, 400, error);
    }

};
module.exports.locationsListByDistance = function (req, res) {
    let lng = parseFloat(req.query.lng);
    let lat = parseFloat(req.query.lat);
    let max = parseFloat(req.query.maxDistance);
    let point = {
        type: "Point",
        coordinates: [lng, lat]
    };
    let geoOptions = {
        spherical: true,
        maxDistance: theEarth.getRadsFromDistance(max),
        num: 10
    };
    if (!lng || !lat) {
        sendJsonResponse(res, 404, {
            "message": "lng and lat query parameters are required"
        });
        return;
    }

    Loc.geoNear(point, geoOptions, function (err, results) {
        let locations = [];
        if (err) {
            sendJsonResponse(res, 404, err);
        }
        else {
            results.forEach(function (doc) {
                locations.push({
                    distance: theEarth.getDistanceFromRads(doc.dis),
                    name: doc.obj.name,
                    address: doc.obj.address,
                    rating: doc.obj.rating,
                    facilities: doc.obj.facilities,
                    _id: doc.obj._id
                });
            });
            sendJsonResponse(res, 200, locations);
        }
    });
};
module.exports.locationsReadOne = function (req, res) {
    if (req.params && req.params.locationid) {
        try {
            Loc
                .findById(req.params.locationid)
                .exec(function (err, location) {
                    if (!location) {
                        sendJsonResponse(res, 404, {
                            "message": "locationid not found"
                        });
                        return;
                    }
                    else if (err) {
                        sendJsonResponse(res, 404, err);

                        return;
                    }
                    sendJsonResponse(res, 200, location);
                });
        } catch (error) {
            sendJsonResponse(res, 404, {
                "message": "No locationid in request"
            });
        }
    }
    else {
        sendJsonResponse(res, 404, {
            "message": "No locationid in request"
        });
    }
};
module.exports.locationsUpdateOne = function (req, res) {
    if (!req.params.locationid) {
        sendJsonResponse(res, 404, {
            "message": "Not found , locationid is required!"
        });
        return;
    }
    Loc
        .findById(req.params.locationid)
        .select('-reviews -rating')
        .exec(
            function (err, location) {
                if (!location) {
                    sendJsonResponse(res, 404, {
                        "message": "locationid not found!"
                    });
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;

                }
                location.name = req.body.name;
                location.address = req.body.address;
                location.facilities = req.body.facilities.split(",");
                location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
                location.openingTimes = [{
                    days: req.body.day1,
                    opening: req.body.opening1,
                    closing: req.body.closing1,
                    closed: req.body.closed1
                },
                {
                    days: req.body.day2,
                    opening: req.body.opening2,
                    closing: req.body.closing2,
                    closed: req.body.closed2
                }];
                location.save(function (err, location) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, location);
                    }
                });
            });
};
module.exports.locationsDeleteOne = function (req, res) {
    if (!req.params.locationid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, locationid!"
        });
    } else {
        Loc
            .findByIdAndRemove(req.params.locationid)
            .exec(
                function (err, location) {
                    let cf = confirm("are you sure you want to delete?");
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    } else if (cf) {
                        sendJsonResponse(res, 204, null);
                        return true;
                    } else {
                        return false;
                    }
                });
    }
};

