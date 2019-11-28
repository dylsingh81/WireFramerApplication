import React from 'react';

class ItemCard extends React.Component {


    render() {
        const { item } = this.props;  

        let statusText = "Completed";
        let statusClass = "list_item_card_completed" +  " card-title col s2";
        if (!item.completed) {
            statusClass = "list_item_card_not_completed" +  " card-title col s2";
            statusText = "Pending";
        }

        var moveDownDisabled = false
        if(item.id == this.props.todoList.items.length-1){
            moveDownDisabled = true
        }

        var moveUpDisabled = false
        if(item.id == 0){
            moveUpDisabled = true
        }
        //onClick={this.props.editItem.bind(this, this.props.item)}
        return (
            <div  className="card z-depth-3 list-item purple lighten-3">
                <div className="card-content grey-text text-darken-3 item-container">
                    <div className = "row no-margin-bottom">
                        <div  className="col s3">
                            <p className= "card-title">{item.description}</p>
                            <p>Assigned To: {item.assigned_to}</p>
                        </div>
                        <div className="card-title col s3">
                            {item.due_date}
                        </div>
                        <div className= {statusClass}>
                            {statusText}
                        </div>
                        
                        <div className="col s4">
                            <div className="menu pmd-floating-action fab-layout"  role="navigation"> 
                                <a href="javascript:void(0);" disabled={moveUpDisabled} onClick={this.props.moveUp.bind(this, this.props.item)} className="sub-btn item-btn pmd-floating-action-btn btn btn-sm pmd-btn-fab pmd-btn-raised pmd-ripple-effect btn-default"> 
                                    <span className="pmd-floating-hidden">Move Item Up</span> 
                                    <i className="material-icons">arrow_upward</i> 
                                </a>
                                <a href="javascript:void(0);" disabled={moveDownDisabled} onClick={this.props.moveDown.bind(this, this.props.item)} className="sub-btn item-btn pmd-floating-action-btn btn btn-sm pmd-btn-fab pmd-btn-raised  pmd-ripple-effect btn-default"> 
                                    <span className="pmd-floating-hidden">Move Item Down</span>
                                    <i className="material-icons">arrow_downward</i>
                                </a> 
                                <a href="javascript:void(0);" onClick={this.props.removeItem.bind(this, this.props.item)} className="sub-btn item-btn pmd-floating-action-btn btn btn-sm pmd-btn-fab pmd-btn-raised pmd-ripple-effect btn-default"> 
                                    <span className="pmd-floating-hidden">Remove Item</span>
                                    <i className="material-icons">clear</i>
                                </a> 
                                <a onClick={this.props.stopProp} id="main-button" className="no-top item-btn pmd-floating-action-btn btn pmd-btn-fab pmd-btn-raised pmd-ripple-effect btn-primary" href="javascript:void(0);"> 
                                    <span className="pmd-floating-hidden">Primary</span>
                                    <i className="material-icons pmd-sm">...</i> 
                                </a> 
                            </div>
                        </div>
                        

                    </div>
                </div>
            </div>
        );
    }
}
export default ItemCard;