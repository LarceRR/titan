import { useEffect, useState } from "react";
import axios from "axios";
import Loading from '../MiniModules/Loading'

export default function OS(props) {
    const port = 3002
    const url = `http://${window.location.hostname}:${port}/sys/`
    const [os, setOs] = useState(null)

    if (os) {
        // console.log(os);
    }

    useEffect(() => {
        axios.get(url+'os', {}, {}, {
            headers: {
                Authorization: localStorage.getItem('frame')
            }
            }).then((resp) => {
                setOs(resp)
            }).catch((err) => {
                if (err) {
                    console.log(err);
                }
            })
    }, [])

    return (
        <div className="OS">
            {os ?
             <div className="OSWrapper">
                <img src={`./icons/${os.data.logofile}.svg`}></img>
                <div className="OSDescription">
                    <span>{os.data.hostname}</span>
                    <span>{os.data.distro}</span>
                    <span>Архитектура: {os.data.arch}</span>
                </div>
                <div className="SystemInfoButton"> 
                    <button>
                        Открыть список активных задач
                    </button>
                </div>
             </div>
             : 
             <Loading />}
        </div>
    )
}