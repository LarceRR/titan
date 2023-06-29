import { useEffect, useState } from "react";
import axios from "axios";
import Loading from '../MiniModules/Loading'

export default function Motherboard(props) {
    const port = 3002
    const url = `http://${window.location.hostname}:${port}/sys/`
    const [motherboard, setMotherboard] = useState(null)

    if (motherboard) {
        // console.log(motherboard);
    }

    useEffect(() => {
        axios.get(url+'motherboard', {}, {}, {
            headers: {
                Authorization: localStorage.getItem('frame')
            }
            }).then((resp) => {
                setMotherboard(resp)
            }).catch((err) => {
                if (err) {
                    console.log(err);
                }
            })
    }, [])

    return (
        <div className="Motherboard">
            {motherboard ?
                <div className="MotherboardWrapper">
                    <div className="Motherboard-header">
                        <img src="./icons/motherboard.svg"></img>
                        <div className="Motherboard-header-name">
                            <span>{motherboard.data.model}</span>
                            <span>{motherboard.data.manufacturer}</span>
                        </div>
                    </div>
                    <div className="Motherboard-footer">
                        <span>{motherboard.data.virtual ? 'Виртуализация включена' : 'Виртуализация отключена'}</span>
                        <span>UUID: {motherboard.data.uuid}</span>
                    </div>
                </div>
                : 
                <Loading />}
        </div>
    )
}