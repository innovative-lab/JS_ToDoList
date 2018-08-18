const listTemplate = (prop) => {

    var titleTemplate = `<div>${prop.title}</div>  
                         <div id='timestamp'>${prop.timeStamp}</div>`;

    var strikeTemplate = `<div><strike><i>${prop.title}</i></strike></div>  
                          <div id='timestamp'><strike><i>${prop.timeStamp}</i></strike></div>`;

    var info = prop.checked ? strikeTemplate : titleTemplate;

    var checkImgURL = prop.checked ? "./images/done-green.svg" : "./images/done.svg";
    return `<div class='list_item' id='${prop.id}'>
                <div id='list_title'>
                    ${info}
                </div>
                <div class='list_opt'>
                    <img name='checked' id='checked-icon' src="${checkImgURL}" alt="" >
                </div>
                <div class='list_opt'>
                    <img name='delete' id='delete-icon' src="./images/delete2.svg" alt="" >
                </div>
            </div>`
}
export default listTemplate;