import {Alert} from 'reactstrap';

const modalComponent = (props)=>{
    switch(props.type){
        case("ERROR"):
           const modalError = Alert.error({
                title: props.title,
                content: props.content,
            });
            if(props.dismiss){
                setTimeout(() => modalError.destroy(), props.dismiss);
            }
        break;
        case("SUCCESS"):
           const modalSuccess = Modal.success({
                title: props.title,
                content: props.content,
            });
            if(props.dismiss){
                setTimeout(() => modalSuccess.destroy(), props.dismiss);
            }
        break;
        case("WARNING"):
            const modalWarning = Modal.warning({
                title: props.title,
                content: props.content,
            });

            if(props.dismiss){
                setTimeout(() => modalWarning.destroy(), props.dismiss);
            }
        break;
        default:
            const modalInfo = Modal.info({
                title: props.title,
                content: props.content,
            })
            if(props.dismiss){
                setTimeout(() => modalInfo.destroy(), props.dismiss);
            }
    }
}

export default modalComponent;
