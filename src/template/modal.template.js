const modalTemplate = () => {
     
    return `<div class='backdrop'>
                <div class='modal checked-icon_animate'>
                    <div id='modal_title'>Task will be deleted from list.</div>
                    <div id='modal_action'>
                        <div id='cancel'>Cancel</div>
                        <div id='done'>Confirm</div>
                    </div>
                </div>
            </div>`
}
export default modalTemplate;