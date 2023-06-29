import NetworkBodyText from "./NetworkBodyText"

export default function NetworkItem(props) {
    // console.log(props);
    return (
        <div className="NetworkItem">
            <div className="Network-header">
                <img src='./icons/network.svg'></img>
                <div className="Network-header-texts">
                    <span>{props.body.iface}</span>
                    <span>{props.body.ifaceName}</span>
                    <span>{props.body.default ? 'Используется по умолчанию' : ''}</span>
                </div>
            </div>
            <div className="Network-body">
                <NetworkBodyText title={`IPv4`} info={props.body.ip4 ? props.body.ip4 : 'NULL'}/>
                <NetworkBodyText title={`IPv4 маска`} info={props.body.ip4subnet ? props.body.ip4subnet : 'NULL'}/>
                <NetworkBodyText title={`IPv6`} info={props.body.ip6 ? props.body.ip6 : 'NULL'}/>
                <NetworkBodyText title={`IPv6 маска`} info={props.body.ip6subnet ? props.body.ip6subnet : 'NULL'}/>
                <NetworkBodyText title={`MAC-адрес`} info={props.body.mac ? props.body.mac : 'NULL'}/>
                <NetworkBodyText title={`Скорость передачи`} info={props.body.speed ? props.body.speed+' Мбит/с' : 'NULL'}/>
                <NetworkBodyText title={`DHCP`} info={props.body.dhcp ? 'Включено' : 'Выключено'}/>
            </div>

        </div>
    )
}

// {
//     "iface": "Ethernet",
//     "ifaceName": "Realtek Gaming GbE Family Controller",
//     "default": true,
//     "ip4": "192.168.1.187",
//     "ip4subnet": "255.255.255.0",
//     "ip6": "fe80::ac3d:6699:bb80:2320",
//     "ip6subnet": "ffff:ffff:ffff:ffff::",
//     "mac": "b4:2e:99:f0:45:56",
//     "internal": false,
//     "virtual": false,
//     "operstate": "up",
//     "type": "wired",
//     "duplex": "",
//     "mtu": "",
//     "speed": 100,
//     "dhcp": true,
//     "dnsSuffix": "",
//     "ieee8021xAuth": "Unknown",
//     "ieee8021xState": "Unknown",
//     "carrierChanges": 0
// }