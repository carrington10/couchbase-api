var TaskModel = require('./models').TaskModel;


var appRouter = function(app){
    app.get("/tasks",function(req,res){
        TaskModel.getAll(function(error,result){
            if(error){
                        
                        return res.status(400).send(error.toString)   
                }// end of error
                res.send(result)
        })// end of  get all
    })// end of get all tasks
    
    app.get("/tasks/:id", function(req,res){
        TaskModel.getbyId(req.params,function(error,result){
                                    if(error){
                                        res.status(400).send(error)
                                    }// end of eeeoe
                
                                    res.send(result);
                    });
    
    })// end of getting tasks by id 


    app.post("/moveTask", function(req,res){
        TaskModel.updateColumn(req.body, function(error,result){
                    if(error){
                        return res.status(400).send(error)
                    }
                    res.send(result)
            })// end of  save
                   
    })// end of tasks id 

    app.post("/deleteTask", function(req,res){
        TaskModel.deleteTask(req.body, function(error,result){
                        if(error){
                            return res.status(400).send(error)
                        }
                        res.send(result)
            })// end of  save
                   
    })// end of tasks id 

    app.post("/editTask", function(req,res){
        TaskModel.editTask(req.body, function(error,result){
                        if(error){
                            return res.status(400).send(error)
                        }
                        res.send(result)
            })// end of  save
                   
    })// end of tasks id 

    app.post("/addTask",function(req,res){
                  TaskModel.save(req.body, function(error,result){
                                if(error){
                                    return res.status(400).send(error)
                                }
                                res.send(result)
                  })// end of  save
    })// end of post

}

module.exports = appRouter