
var uuid = require("uuid");
var N1qlquery = require("couchbase").N1qlQuery
var bucket = require("./app").bucket


function TaskModel(){}

TaskModel.getAll = function(callback){
    // old query select meta(kanban).id,name,task,columnId,DATE_FORMAT_STR(timestamp,'1111-11-11') as date from kanban where notDeleted = true order by timestamp 
    var statement = "select meta(kanban).id,name,task,estimatedTime,columnId,DATE_FORMAT_STR(timestamp,'1111-11-11') as date, DATE_ADD_STR(DATE_FORMAT_STR(timestamp,'1111-11-11'), 7, 'day') as days from kanban where notDeleted = true order by timestamp"

    var query = N1qlquery.fromString(statement);

    bucket.query(query, function(error,result){
        if(error){
            console.log(error);
            return callback(error,null);
        }// end of if 

        callback(null,result)
    })// end of query

}// end of get all 

TaskModel.getbyId = function(data,callback){

    bucket.get(data.id, function(error,result){
            if(error){ 
                        console.log(error)
                        return callback(error,null)
            }// end of if
                console.log(result.value.name)
                console.log(result.value.task)
            return callback(null,result)
    
    })// end of bucjet get 

}// end of getbyId

TaskModel.updateColumn = function(data,callback){
    console.log(data.id)
    console.log("here")
        bucket.get(data.id, function(error,result){
                        if(error){ 
                                    console.log(error)
                                    return callback(error,null)
                        }// end of if
                            console.log(result.value.name)
                            console.log(result.value.task)
                            var task = result.value
                            task.columnId = data.columnId
                            task.id = data.id
                            console.log("in here now")
                            console.log(task.id)
                            console.log("end of it ")
                            bucket.upsert(task.id,task,function(error,result) {

                                if(error){
                                    console.log(error);
                                    return callback(error, null );
                                }// end of if for callback
                                    
                                callback(null,result);
            })// end of id 
                

    })// end of bucket
     
}// end of updateColumn

TaskModel.deleteTask = function(data,callback){
    console.log(data.id)
        bucket.get(data.id, function(error,result){
                        if(error){ 
                                    console.log(error)
                                    return callback(error,null)
                        }// end of if
                            console.log(result.value.name)
                            console.log(result.value.task)
                            var task = result.value
                            task.notDeleted = false
                            task.id = data.id
                            console.log("in here now")
                            console.log(task.notDeleted)
                            console.log("end of it ")
                            bucket.upsert(task.id,task,function(error,result) {

                                if(error){
                                    console.log(error);
                                    return callback(error, null );
                                }// end of if for callback
                                    
                                callback(null,result);
            })// end of id 
                

    })// end of bucket
     
}// end of delete column

TaskModel.editTask = function(data,callback){
    console.log(data.id)
        bucket.get(data.id, function(error,result){
                        if(error){ 
                                    console.log(error)
                                    return callback(error,null)
                        }// end of if
                            console.log(result.value.name)
                            console.log(result.value.task)
                            var task = result.value
                            task.task = data.task
                            task.id = data.id
                            console.log("in here now")
                            console.log(task.task)
                            console.log("end of it ")
                            bucket.upsert(task.id,task,function(error,result) {

                                if(error){
                                    console.log(error);
                                    return callback(error, null );
                                }// end of if for callback
                                    
                                callback(null,result);
            })// end of id 
                

    })// end of bucket
     
}// end of editTask

TaskModel.save = function(data,callback){
    var task = {
        name:data.name,
        task:data.task,
        estimatedTime: data.estimatedTime,
        timestamp: (new Date()),
        columnId: 1,
        notDeleted:true,
        type: "Task"
    }
    var id = uuid.v4();
    var id = data.id ? data.id : uuid.v4();
    bucket.upsert(id,task,function(error,result) {

                    if(error){
                        console.log(error);
                        return callback(error, null );
                    }// end of if for callback

                    callback(null,result);
    })// end of id 
}// end of task model save 

module.exports.TaskModel = TaskModel;

