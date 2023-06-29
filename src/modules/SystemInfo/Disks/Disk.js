import { useEffect, useState } from "react";
import axios from "axios";
import Loading from '../../MiniModules/Loading'
import DiskItem from './DiskItem'

export default function Disk(props) {

    const port = 3002
    const url = `http://${window.location.hostname}:${port}/sys/`
    const [disks, setDisks] = useState(null)

    useEffect(() => {
        axios.get(url+'disks', {}, {}, {
            headers: {
                Authorization: localStorage.getItem('frame')
            }
            }).then((resp) => {
                setDisks(resp)
            }).catch((err) => {
                if (err) {
                    console.log(err);
                }
            })
    }, [])

    const diskItems = []; 
    const diskLineColors = ['#FF7B42','#428EFF']

    if (disks) {
        // console.log(disks);
        for (let i = 0; i < disks.data.length; i++) {
            diskItems.push(<DiskItem fs={disks.data[i].fs} type={disks.data[i].type} available={disks.data[i].available} size={disks.data[i].size} used={disks.data[i].used} usedPercent={disks.data[i].use} color={diskLineColors[i]}/>)
            // console.log(i);
        }
    }

    return (
        <div className="Disks">
            <span className="SystemWrapperTitle">Диски:</span>
            {disks ?
                <div className="DisksWrapper">
                    {diskItems}
                </div>
            : <Loading />}
        </div>
    )
}