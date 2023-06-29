import './SystemInfo.css'
import OS from './OS'
import Motherboard from './Motherboard'
import CPU from './CPU'
import Disk from './Disks/Disk'
import Network from './Networks/Network'
import WiFi from './WiFi/WiFi'
import RAM from './RAM/RAM'
import Bluetooth from './Bluetooth/Bluetooth'

export default function SystemInfo(props) {
    return (
        <div className="SystemInfo">
            <div className='GeneralSystemInfo'>
                <OS />
                <div className='GeneralCPUMother'>
                    <Motherboard />
                    <CPU />
                </div>
            </div>
            <div className='DiskInfo'>
                <Disk />
            </div>
            <div className='NetworkInfo'>
                <Network />
            </div>
            <div className='WiFiRamBlueInfo'>
                <div className='WiFi-Ram-Wrapper'>
                    <WiFi />
                    <RAM />
                </div>
                <Bluetooth />
            </div>
        </div>
    )
}