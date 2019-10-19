const osUtils = require('os-utils');
const childProcess = require('child_process');
const si = require('systeminformation');
const isOnline = require('is-online');



exports.cpuUsage = async () => {

    return new Promise(
        (resolve, reject) => {
            osUtils.cpuUsage((data) => {
                resolve(data);
            });
        });
}
exports.check_net = async () => {

    let internet = await isOnline()
    console.log("Internet Status!!", internet);
    return internet;
};


exports.cachedMemory = async () => {
    return new Promise((resolve, reject) => {
        childProcess.exec('free -m', function (error, stdout, stderr) {
            var lines = stdout.split("\n");
            var str_mem_info = lines[1].replace(/[\s\n\r]+/g, ' ');
            var mem_info = str_mem_info.split(' ')
            total_mem = parseFloat(mem_info[1])
            free_mem = parseFloat(mem_info[3])
            buffers_mem = parseFloat(mem_info[5])
            cached_mem = parseFloat(mem_info[6])

            used_mem = total_mem - (free_mem + buffers_mem + cached_mem)
            console.log("cached_mem 2: ", cached_mem)
            console.log("used_mem 2: ", used_mem)
            let data = {
                cache: cached_mem,
                used: used_mem,
            }
            resolve(data);
        });
    });
}
exports.getGeneralInfo = async () => {
    let a = await si.mem()
    console.log("TIME!!!!!! ", si.time())
    si.osInfo()
        .then(data => console.log("data222....", data))
        .catch(error => console.error("errro22222222............", error));
    const cpu = await si.cpu();
    if (cpu) {
        return cpu;
    }
}