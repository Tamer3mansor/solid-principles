enum searchType {
    _email = 1,
    _rate = 2,
    _type = 3
}
//separate each function in class and implement from one interface   
interface _search {
    getData(type: any, val: any): any;
};

class searchByEmail implements _search {
    public getData(type: any, val: any) {
        let DataBase: any;
        return new Promise(function (resolve, reject) {
            DataBase.query(
                "SELECT * FROM childcare.user where email =?", [val],
                function (err: any, rows: any) {
                    if (rows === undefined) {
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(rows[0]);
                    }

                })
        });
    }
};

class searchByRate implements _search {
    public getData(type: any, val: any) {
        let DataBase: any;
        return new Promise(function (resolve, reject) {
            DataBase.query(
                "SELECT * FROM childcare.user where Rate =?", [val],
                function (err: any, rows: any) {
                    if (rows === undefined) {
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(rows[0]);
                    }

                })
        });
    }
};
