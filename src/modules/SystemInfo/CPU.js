import { useEffect, useState } from "react";
import axios from "axios";
import Loading from '../MiniModules/Loading'

export default function Motherboard(props) {
    const port = 3002
    const url = `http://${window.location.hostname}:${port}/sys/`
    const [cpu, setCpu] = useState(null)

    if (cpu) {
        // console.log(cpu);
    }

    useEffect(() => {
        axios.get(url+'cpu', {}, {}, {
            headers: {
                Authorization: localStorage.getItem('frame')
            }
            }).then((resp) => {
                setCpu(resp)
            }).catch((err) => {
                if (err) {
                    console.log(err);
                }
            })
    }, [])

    return (
        <div className="CPU">
            {cpu ?
                <div className="CPUWrapper">
                    <div className="CPU-header">
                        <img src="./icons/cpu.svg"></img>
                        <div className="CPU-header-name">
                            <span>{cpu.data.manufacturer}</span>
                            <span>{cpu.data.brand}</span>
                        </div>
                        <div className="CPU-header-values">
                            <div className="CPU-header-temp">
                                <span>65C</span>
                                <span>Температура</span>
                            </div>
                            <div className="CPU-header-speed">
                                <span>3.1 ГГц</span>
                                <span>Скорость</span>
                            </div>
                        </div>
                    </div>
                    <div className="CPU-footer">
                        <span>Макс. скорость: {cpu.data.speedMax}</span>
                        <span>Сокет: {cpu.data.socket}</span>
                        <span>Ядер: {cpu.data.physicalCores}</span>
                        <span>Потоков: {cpu.data.cores}</span>
                    </div>
                </div>
                : 
                <Loading />}
        </div>
    )
}