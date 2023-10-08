'use strict';
const footerSelectionCount=12;
const model = {
    columns: [],
    addColumn: function(){
        let obj = {};   
        obj.color = this.createColorText();
        obj.isLocked = false;
        obj.column=view.createColumn(obj);
        this.columns.push(obj);
    },

    removeColumn:function(){
        let i = this.columns.length-1;
        while (i>-1){
            if(this.columns[i].isLocked == false){
                console.log(i);
                view.removeColumn(this.columns[i].column);
                this.columns.splice(i,1);
                return true;
            }
        }
        return false;
    },

    createColorText: function(){
        const lengthOfHexCode = 6;
        const dictionary = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
        let hexString = '#';
        for(let i=0;i<lengthOfHexCode;i++){
            let rand = dictionary[Math.floor(Math.random()*16)];
            hexString+=rand;
        }
        return hexString;
    },

    changeColor: function(){
        console.log();
        for(let i =0;i<model.columns.length;i++){
            if(model.columns[i].isLocked===false){
                model.columns[i].color = model.createColorText();
                view.changeColor(model.columns[i]);
            }
        }
    },

    changeIsLocked: function(elem){
        for(let i =0;i<model.columns.length;i++){
            if(elem.target===model.columns[i].column){
                console.log(model.columns[i].isLocked);
                model.columns[i].isLocked=!(model.columns[i].isLocked);
                console.log(model.columns[i].isLocked);
            }
        }

    }

}
const view = {
    parent,
    parentSetup: function(){
        this.parent = document.querySelector('.main');
    },
    init: function(){
        this.parentSetup();
        let footer = document.querySelector('.footer__select');
        for(let i=0;i<=footerSelectionCount;i++){
            let option = createFooterSelectionOption(i);
            footer.appendChild(option);
        }
        footer.addEventListener('change',this.changeNumberOfColumns);        
        function createFooterSelectionOption(option){
            const newOption = document.createElement('option');
            newOption.value=option;
            newOption.innerText=option;
            return newOption;
        }
    },
    createColumn:function(column){
        const newDiv=document.createElement('div');
        newDiv.classList.add('main__item');
        const newHeader = this.createHeader(column.color)
        newDiv.appendChild(newHeader);
        newDiv.style.background=column.color;
        this.parent.appendChild(newDiv);
        newDiv.addEventListener('click', model.changeIsLocked);
        return newDiv;
    },
    removeColumn:function(column){
        this.parent.removeChild(column);
    },
    createHeader(color){
        const newHeader= document.createElement('h2');
        newHeader.classList.add('main__item-header');
        newHeader.innerText = color;
        return newHeader;
    },
    changeNumberOfColumns:function(elem){
        let target = elem.target;
        let number = target.value;
        console.log(view.parent);
        if(view.parent.children.length<number){
            while(view.parent.children.length<number){
                model.addColumn();
    
            }
        }else if(view.parent.children.length>number){
            while(view.parent.children.length>number){
                model.removeColumn();
            }
        }
    },
    changeColor:function(elem){
        let parent = elem.column;
        parent.children[0].innerText=elem.color;
        parent.style.background=elem.color;
    }


}

window.onload = view.init();
setInterval(model.changeColor, 3000);