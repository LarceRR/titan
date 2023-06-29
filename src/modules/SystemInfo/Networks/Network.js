import { useEffect, useState } from "react";
import axios from "axios";
import Loading from '../../MiniModules/Loading'
import NetworkItems from './NetworkItem'

export default function Network(props) {
    
    const port = 3002
    const url = `http://${window.location.hostname}:${port}/sys/`
    const [networks, setNetworks] = useState(null)

    useEffect(() => {
        axios.get(url+'networks', {}, {}, {
            headers: {
                Authorization: localStorage.getItem('frame')
            }
            }).then((resp) => {
                setNetworks(resp)
            }).catch((err) => {
                if (err) {
                    console.log(err);
                }
            })
    }, [])

    const networkItems = [];

    if (networks) {
        // console.log(networks);
        for (let i = 0; i < networks.data.length; i++) {
            networkItems.push(<NetworkItems body={networks.data[i]}/>)
            // console.log(i);
        }
    }

    return (
        <div className="Networks">
            <span className="SystemWrapperTitle">Сеть:</span>
            {networks ?
                <div className="NetworksWrapper">
                    {networkItems}
                </div>
            : <Loading />}
        </div>
    )
}