var request = require('supertest');
var expect = require('chai').expect;
var url = 'http://localhost:8089/';
var aggent;

require('../../config/environment/development');

describe('Product Specs', function () {
    'use strict';

    describe('Product with admin', function () {
        var id;
        this.timeout(10000);

        before(function (done) {
            aggent = request.agent(url);
            aggent
                .post('users/login')
                .send({
                    login: 'superAdmin',
                    pass : '111111',
                    dbId : 'vasyadb'
                })
                .expect(200, done);
        });

        after(function (done) {
            aggent
                .get('logout')
                .expect(302, done);
        });

        it('should create Product', function (done) {
            var body = {
                'accounting'    : {
                    'category': {
                        'name': 'All',
                        '_id' : '564591f9624e48551dfe3b23'
                    }
                },
                'canBeExpensed' : true,
                'canBePurchased': true,
                'canBeSold'     : false,
                'groups'        : {
                    'group': [],
                    'owner': '560c099da5d4a2e20ba5068b',
                    'users': []
                },
                'info'          : {
                    'barcode'    : '543345',
                    'description': 'New testProduct',
                    'isActive'   : true,
                    'productType': 'Service',
                    'salePrice'  : '123'
                },
                'name'          : 'TestProduct',
                'whoCanRW'      : 'everyOne'
            };

            aggent
                .post('products')
                .send(body)
                .expect(200)
                .end(function (err, res) {
                    var body = res.body;

                    if (err) {
                        return done(err);
                    }

                    expect(body)
                        .to.be.instanceOf(Object);
                    expect(body)
                        .to.have.property('success')
                        .and.to.have.property('_id');

                    id = body.success._id;

                    done();
                });
        });

        it('should fail create Product', function (done) {
            var body = {};

            aggent
                .post('products')
                .send(body)
                .expect(400, done);
        });

        it('should patch Product', function (done) {
            var body = {
                'canBeExpensed' : false,
                'canBePurchased': false,
                'canBeSold'     : true,
                'name'          : 'TestProduct1',
                'info'          : {
                    'barcode'    : '543345',
                    'description': 'New testProduct1',
                    'isActive'   : true,
                    'productType': 'Product',
                    'salePrice'  : '123'
                }
            };

            aggent
                .patch('products/' + id)
                .send(body)
                .expect(200, done);
        });

        it('should fail patch product', function (done) {
            var body = {};

            aggent
                .patch('products/123cba')
                .send(body)
                .expect(500, done);

        });

        it('should get products Alphabet', function (done) {

            aggent
                .get('products/getProductsAlphabet')
                .expect(200)
                .end(function (err, res) {
                    var body = res.body;

                    if (err) {
                        return done(err);
                    }

                    expect(body)
                        .to.be.instanceOf(Object)
                        .and.to.have.property('data')
                        .and.to.be.instanceOf(Array);

                    done();
                });
        });

        it('should get products all', function (done) {
            var query = {
                canBeSold: true
            };

            aggent
                .get('products')
                .query(query)
                .expect(200)
                .end(function (err, res) {
                    var body = res.body;

                    if (err) {
                        return done(err);
                    }

                    expect(body)
                        .to.be.instanceOf(Object)
                        .and.to.have.property('success')
                        .and.to.be.instanceOf(Array)
                        .and.to.have.deep.property('[0]')
                        .and.to.have.property('canBeSold', true);

                    done();
                });
        });

        it('should get products images', function (done) {

            aggent
                .get('products/getProductsImages')
                .query({'ids[0]': id})
                .expect(200)
                .end(function (err, res) {
                    var body = res.body;

                    if (err) {
                        return done(err);
                    }

                    expect(body)
                        .to.be.instanceOf(Object)
                        .and.to.have.property('data')
                        .and.to.be.instanceOf(Array)
                        .and.to.have.deep.property('[0]')
                        .and.to.have.property('imageSrc');

                    done();
                });
        });

        // todo exportToXlsx test

        // todo exportToCsv test

        it('should get productsType for Dd', function (done) {

            aggent
                .get('products/getProductsTypeForDd')
                .expect(200)
                .end(function (err, res) {
                    var body = res.body;

                    if (err) {
                        return done(err);
                    }

                    expect(body)
                        .to.be.instanceOf(Object)
                        .and.to.have.property('data')
                        .and.to.be.instanceOf(Array)
                        .and.to.have.deep.property('[0]')
                        .and.to.have.property('_id');

                    done();
                });
        });

        /*it('should get products totalCollectionLength', function (done) {
         var query = {
         filter: {
         canBeSold: {
         key: 'canBeSold'
         }
         }
         };

         aggent
         .get('products/totalCollectionLength')
         .query(query)
         .query({'filter[canBeSold][value][0]': true})
         .expect(200)
         .end(function (err, res) {
         var body = res.body;

         if (err) {
         return done(err);
         }

         expect(body)
         .to.be.instanceOf(Object);

         expect(body)
         .to.have.property('count')
         .and.to.be.gte(1);

         done();
         });
         });*/

        it('should get product by id', function (done) {
            var query = {
                id: id
            };

            aggent
                .get('products/')
                .query(query)
                .expect(200)
                .end(function (err, res) {
                    var body = res.body;

                    if (err) {
                        return done(err);
                    }
                    expect(body)
                        .to.be.instanceOf(Object);
                    expect(body)
                        .to.have.property('_id')
                        .and.to.be.equal(id);

                    done();
                });
        });

        it('should fail get product by id', function (done) {
            var query = {
                id: '123cba'
            };

            aggent
                .get('products/')
                .query(query)
                .expect(400, done);

        });

        it('should get products for list', function (done) {
            var query = {
                contentType: 'Products',
                count      : '1',

                'filter[canBePurchased][key]'    : 'canBePurchased',
                'filter[canBePurchased][value][]': true
            };

            aggent
                .get('products/')
                .query(query)
                .expect(200)
                .end(function (err, res) {
                    var body = res.body;

                    if (err) {
                        return done(err);
                    }

                    expect(body)
                        .to.be.instanceOf(Object)
                        .and.to.have.property('success')
                        .and.to.be.instanceOf(Array)
                        .and.to.have.deep.property('[0]');
                    expect(body.success.length)
                        .to.be.equal(5);
                    expect(body.success[0])
                        .to.have.property('canBeSold', true);
                    expect(body.success[0])
                        .to.have.property('info')
                        .and.to.have.property('productType', 'Service');

                    done();
                });
        });

        it('should delete product', function (done) {
            aggent
                .delete('products/' + id)
                .expect(200, done);
        });

        it('should fail delete product', function (done) {
            aggent
                .delete('products/123cba')
                .expect(500, done);
        });

    });

    describe('Product with user without a license', function () {

        before(function (done) {
            aggent = request.agent(url);

            aggent
                .post('users/login')
                .send({
                    login: 'ArturMyhalko',
                    pass : 'thinkmobiles2015',
                    dbId : 'vasyadb'
                })
                .expect(200, done);
        });

        after(function (done) {
            aggent
                .get('logout')
                .expect(302, done);
        });

        it('should fail create Product', function (done) {

            var body = {
                'accounting'    : {
                    'category': {
                        'name': 'All',
                        '_id' : '564591f9624e48551dfe3b23'
                    }
                },
                'canBeExpensed' : true,
                'canBePurchased': true,
                'canBeSold'     : true,
                'groups'        : {
                    'group': [],
                    'owner': '560c099da5d4a2e20ba5068b',
                    'users': []
                },
                'info'          : {
                    'barcode'    : '543345',
                    'description': 'New testProduct',
                    'isActive'   : true,
                    'productType': 'Stock',
                    'salePrice'  : '123'
                },
                'name'          : 'TestProduct',
                'whoCanRW'      : 'everyOne'
            };

            aggent
                .post('products')
                .send(body)
                .expect(403, done);
        });
    });

    describe('Product with no authorise', function () {

        it('should fail get Product for View', function (done) {

            aggent
                .get('products')
                .expect(404, done);
        });

    });

});

