export default function Weather (props) {
    var base64alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=';
    function decodeUInt8String(input) {
        var output = [];
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\-_=]/g, '');
        while (i < input.length) {
            var enc1 = base64alphabet.indexOf(input.charAt(i++));
            var enc2 = base64alphabet.indexOf(input.charAt(i++));
            var enc3 = base64alphabet.indexOf(input.charAt(i++));
            var enc4 = base64alphabet.indexOf(input.charAt(i++));
            var chr1 = (enc1 << 2) | (enc2 >> 4);
            var chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            var chr3 = ((enc3 & 3) << 6) | enc4;
            output.push(String.fromCharCode(chr1));
            if (enc3 !== 64) {
                output.push(String.fromCharCode(chr2));
            }
            if (enc4 !== 64) {
                output.push(String.fromCharCode(chr3));
            }
        }
        return output.join('');
    }
    function getKey() {
        return decodeUInt8String("vTaiSlqST3W5wstNFfmEHrPLSqXyQz2uA3LAt9qvQ_JHQUVSHJW5Ixs34OPziK5c1xXp5SdByjGjzG_VaT8NKw==");
    }
    return (
        <div className="Weather">
            {getKey()}
        </div>
    )
}