import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalDetailTask: React.FC<any> = (props: any) => { 
    const getProgressColor = (value) => {
        if(value >= 80) {     //80-100
            return "#01AD23";
        }
        if(value >= 60) { // 60-80
            return "#80C02B";
        }
        if(value >= 40) { //40-60
            return "#FFD334";
        }
        if(value >= 20) { //20-40
            return "#F08130";
        }
        return "#E22E2F";  //0-20
    }   
    const formatDate = (textDate) => {
        let date = new Date(textDate);
        let day = date.getDate().toString();
        let month = (date.getMonth()+1).toString();
        let year = date.getFullYear().toString();
        return (day.length < 2 ? "0" + day : day ) +" - "+ (month.length < 2 ? "0"+ month : month) + " - " + year;
    }
    const CalcPercent = () => {
        let totalTask = props.dataUser.taskInProgress.length + props.dataUser.taskPlanned.length + props.dataUser.taskComplete.length;
        return totalTask == 0? NaN : Math.floor(props.dataUser.taskComplete.length/totalTask*100 + 0.05);
    }
    const percent = CalcPercent();
  return (
    <>
      <Modal
        size={props.size ? 'sm' : props.size}
        show={props.show} // false: Không hiển thị, true: hiển thị
        onHide={() => {
          props.funcOnHide();
        }}
        scrollable
        centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.dataUser.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row d-flex justify-content-center mt-2 mb-3">
              <div className="col-1" style={{fontSize:"14px", fontWeight:"bold",color: getProgressColor(percent)}}>
                  {isNaN(percent)?"0 task":percent+"%"}
                </div>
              <div className="col-10">
                  {isNaN(percent) ? 
                    <>
                        <div className="progress" style={{height:"25px", width:"100%"}}></div>
                    </> :
                    <>
                        <div className="progress progress-bar-striped" style={{height:"25px", width:"100%"}}>
                            <div className="progress-bar" role="progressbar" 
                            style={{width: percent==0? "0.2%" : percent +"%", height:"25px",
                                    backgroundColor: getProgressColor(percent)}}>{percent}%
                            </div>
                        </div>
                    </>  
                }
              </div>
          </div>
          <div className="row d-flex justify-content-center mb-3">
            <div className="col-11">
                <div className="row">
                    <h3 className="text-warning">Planned ({props.dataUser.taskPlanned.length})</h3>
                </div>
                <div className="row" style={{width:"100%"}}>
                    {props.dataUser.taskPlanned.map((value, index) => {
                        return (
                            <div className="card" style={{width: "23%", padding: "10px", border: "2px solid #FFC107", 
                                                        marginLeft:"2%", marginBottom:"2%"}}>
                                <div className="card-body">
                                    <h4 className="card-title text-priamry">{value.taskname.toUpperCase()}</h4>
                                    <p style={{fontWeight: "bold", fontSize:"11px", margin: "0px"}}>
                                        <span >Created by: </span>
                                        <span style={{color:"#007BFF"}}>{props.data[value.authorId].username}</span>
                                    </p>
                                    <p style={{fontWeight: "bold", fontSize:"11px", margin: "0px"}}>
                                        <span>Deadline: </span>
                                        <span style={{color:"#FA0019"}}>{formatDate(value.deadline)}</span>
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center mb-3">
            <div className="col-11">
                <div className="row">
                    <h3 className="text-primary">In Progress ({props.dataUser.taskInProgress.length})</h3>
                </div>
                <div className="row" style={{width:"100%"}}>
                    {props.dataUser.taskInProgress.map((value, index) => {
                        return (
                            <div className="card" style={{width: "23%", padding: "10px", border: "2px solid #007BFF", 
                                                        marginLeft:"2%", marginBottom:"2%"}}>
                                <div className="card-body">
                                    <h4 className="card-title text-priamry">{value.taskname.toUpperCase()}</h4>
                                    <p style={{fontWeight: "bold", fontSize:"11px", margin: "0px"}}>
                                        <span >Created by: </span>
                                        <span style={{color:"#007BFF"}}>{props.data[value.authorId].username}</span>
                                    </p>
                                    <p style={{fontWeight: "bold", fontSize:"11px", margin: "0px"}}>
                                        <span>Deadline: </span>
                                        <span style={{color:"#FA0019"}}>{formatDate(value.deadline)}</span>
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center mb-3">
            <div className="col-11">
                <div className="row">
                    <h3 className="text-success">Completed ({props.dataUser.taskComplete.length})</h3>
                </div>
                <div className="row" style={{width:"100%"}}>
                    {props.dataUser.taskComplete.map((value, index) => {
                        return (
                            <div className="card" style={{width: "23%", padding: "10px", border: "2px solid #08B530", 
                                                        marginLeft:"2%", marginBottom:"2%"}}>
                                <div className="card-body">
                                    <h4 className="card-title text-priamry">{value.taskname.toUpperCase()}</h4>
                                    <p style={{fontWeight: "bold", fontSize:"11px", margin: "0px"}}>
                                        <span >Created by: </span>
                                        <span style={{color:"#007BFF"}}>{props.data[value.authorId].username}</span>
                                    </p>
                                    <p style={{fontWeight: "bold", fontSize:"11px", margin: "0px"}}>
                                        <span>Deadline: </span>
                                        <span style={{color:"#FA0019"}}>{formatDate(value.deadline)}</span>
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center mb-3">
            <div className="col-11">
                <div className="row">
                    <h3 className="text-danger">Over deadline ({props.dataUser.taskOverDeadline.length})</h3>
                </div>
                <div className="row" style={{width:"100%"}}>
                    {props.dataUser.taskOverDeadline.map((value, index) => {
                        return (
                            <div className="card" style={{width: "23%", padding: "10px", border: "2px solid #FA0019", 
                                                        marginLeft:"2%", marginBottom:"2%"}}>
                                <div className="card-body">
                                    <h4 className="card-title text-priamry">{value.taskname.toUpperCase()}</h4>
                                    <p style={{fontWeight: "bold", fontSize:"11px", margin: "0px"}}>
                                        <span >Created by: </span>
                                        <span style={{color:"#007BFF"}}>{props.data[value.authorId].username}</span>
                                    </p>
                                    <p style={{fontWeight: "bold", fontSize:"11px", margin: "0px"}}>
                                        <span>Deadline: </span>
                                        <span style={{color:"#FA0019"}}>{formatDate(value.deadline)}</span>
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
          </div>
          
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalDetailTask;
