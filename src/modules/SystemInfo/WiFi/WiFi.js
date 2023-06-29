
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from '../../MiniModules/Loading'

export default function WiFi(props) {

    const port = 3002
    const url = `http://${window.location.hostname}:${port}/sys/`
    const [wifi, setWifi] = useState(null)

    useEffect(() => {
        axios.get(url+'wifi', {}, {}, {
            headers: {
                Authorization: localStorage.getItem('frame')
            }
            }).then((resp) => {
                setWifi(resp)
            }).catch((err) => {
                if (err) {
                    console.log(err);
                }
            })
    }, [])

    return (
        <div className="WiFi">
            <div className="SystemTitleBody">
                <span className="SystemWrapperTitle">Wi-Fi:</span>
                {wifi ? wifi.data.length < 1 ? <span className="SystemWrapperTitleError">Нет данных (возможны проблемы с Wi-Fi модулем)</span> : '' : ''}
            </div>
            {wifi ?
                <div className="NetworksWrapper">
                </div>
            : <Loading />}
        </div>
    )
}