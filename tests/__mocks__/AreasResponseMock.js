const AreasResponseMock = {
    "visits": [
        {
            "_id":"Center",
            "visits": [
                {
                    "_id":"Rodrigues",
                    "visit": {
                        "_id":"000000000000000000000001",
                        "visit_date":"2016-10-19T13:30:13.329Z",
                        "sales_quantity":100,
                        "value_received":250,
                        "client": {
                            "__v":0,
                            "updatedAt":"2016-10-18T12:30:13.337Z",
                            "createdAt":"2016-10-18T12:30:13.337Z",
                            "name":"Rodrigues",
                            "address":"Street 23",
                            "city":"London",
                            "area": {
                                "parents":"Center",
                                "_id":"Center"
                            },
                            "frequency":10,
                            "ability":200,
                            "_id":"580615d5d992eb00738fab54"
                        },
                        "user": {
                            "__v":0,
                            "updatedAt":"2016-10-18T12:30:13.340Z",
                            "createdAt":"2016-10-18T12:30:13.340Z",
                            "username":"Gabriel",
                            "email":"gabriel@teste.com",
                            "password":"12345678",
                            "_id":"580615d5d992eb00738fab55"
                        },
                        "__v":0
                    }
                },
                {
                    "_id":"Gabriel",
                    "visit": {
                        "_id":"580615d5d992eb00738fab58",
                        "visit_date":"2016-10-19T13:30:13.329Z",
                        "sales_quantity":100,
                        "value_received":250,
                        "client": {
                            "__v":0,
                            "updatedAt":"2016-10-18T12:30:13.333Z",
                            "createdAt":"2016-10-18T12:30:13.333Z",
                            "name":"Gabriel",
                            "address":"Street 23",
                            "city":"London",
                            "area": {
                                "parents":"Center",
                                "_id":"Center"
                            },
                            "frequency":10,
                            "ability":200,
                            "_id":"580615d5d992eb00738fab52"
                        },
                        "user": {
                            "__v":0,
                            "updatedAt":"2016-10-18T12:30:13.340Z",
                            "createdAt":"2016-10-18T12:30:13.340Z",
                            "username":"Gabriel",
                            "email":"gabriel@teste.com",
                            "password":"12345678",
                            "_id":"580615d5d992eb00738fab55"
                        },
                        "__v":0
                    }
                }
            ]
        },
        {
            "_id":"South",
            "visits": [
                {
                    "_id":"Gonçalves",
                    "visit": {
                        "_id":"580615d5d992eb00738fab57",
                        "visit_date":"2016-10-18T12:30:13.329Z",
                        "sales_quantity":100,
                        "value_received":250,
                        "client": {
                            "__v":0,
                            "updatedAt":"2016-10-18T12:30:13.335Z",
                            "createdAt":"2016-10-18T12:30:13.335Z",
                            "name":"Gonçalves",
                            "address":"Street 32",
                            "city":"London",
                            "area": {
                                "parents":"Center",
                                "_id":"South"
                            },
                            "frequency":20,
                            "ability":200,
                            "_id":"580615d5d992eb00738fab53"
                        },
                        "user": {
                            "__v":0,
                            "updatedAt":"2016-10-18T12:30:13.340Z",
                            "createdAt":"2016-10-18T12:30:13.340Z",
                            "username":"Gabriel",
                            "email":"gabriel@teste.com",
                            "password":"12345678",
                            "_id":"580615d5d992eb00738fab55"
                        },
                        "__v":0
                    }
                }
            ]
        }
    ]
};

export default AreasResponseMock;
