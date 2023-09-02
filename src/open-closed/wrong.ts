enum searchType {
    email = 1,
    rate = 2,
    type = 3
}
class search {
    type: number;
    constructor(type: number) {
        this.type = type;
    }
    choose(type: any, val: any): any {
        let DataBase: any;
        if (type == 1) {
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
        else if (type == 2) {
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
    }

}
