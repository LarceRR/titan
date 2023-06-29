
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from '../../MiniModules/Loading'
import byteConverter from '../../MiniModules/byteConverter'

export default function RAM(props) {

    const port = 3002
    const url = `http://${window.location.hostname}:${port}/sys/`
    const [ram, setRam] = useState(null)

    useEffect(() => {
        axios.get(url+'ram', {}, {}, {
            headers: {
                Authorization: localStorage.getItem('frame')
            }
            }).then((resp) => {
                setRam(resp)
            }).catch((err) => {
                if (err) {
                    console.log(err);
                }
            })
    }, [])

    return (
        <div className="RAM">
            <div className="SystemTitleBody">
                <span className="SystemWrapperTitle">Оперативная память:</span>
            </div>
            {ram ?
                <div className="RAMWrapper">
                    <div className="RAM-plates">
                        NONE
                    </div>
                    <div className="RAM-loadWrapper">
                        <div className="RAM-loadBody">
                            <div className="RAM-load" style={{width: Math.floor((ram.data.used/ram.data.total)*100)+'%'}}>

                            </div>
                        </div>
                        <span>{`${byteConverter(ram.data.free, 1)} свободно из ${byteConverter(ram.data.total, 1)}`}</span>
                    </div>
                </div>
            : <Loading />}
        </div>
    )
}