function isValidUrl(str) {
    let url;
    try {
        url = new URL(str);
    } catch (_) {
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
}

function isHttps(str) {
    let first8Chars = '';
    for (let i = 0; i < 8; i++) {
        first8Chars += str[i];
    }
    return first8Chars === 'https://';
}

const gateways = [
    'asan.shaparak.ir',
    'bpm.shaparak.ir',
    'pec.shaparak.ir',
    'pecco.shaparak.ir',
    'sep.shaparak.ir',
    'sep2.shaparak.ir',
    'pep.shaparak.ir',
    'pna.shaparak.ir',
    'sadad.shaparak.ir',
    'ikc.shaparak.ir',
    'fanava.shaparak.ir',
    'fcp.shaparak.ir',
    'mabna.shaparak.ir',
    'ecd.shaparak.ir',
    'pas.shaparak.ir',
    'sepehr.shaparak.ir',
    'say.shaparak.ir',
    'sayan.shaparak.ir',
];

const companies = [
    'آسان پرداخت پرشین',
    'به پرداخت ملت',
    'تجارت الکترونیک پارسیان',
    'تجارت الکترونیک پارسیان',
    'پرداخت الکترونیک سامان',
    'پرداخت الکترونیک سامان',
    'پرداخت الکترونیک پاسارگاد',
    'پرداخت نوین آرین',
    'پرداخت الکترونیک سداد',
    'کارت اعتباری ایران کیش',
    'فن آوا کارت',
    'فن آوا کارت',
    'پرداخت الکترونیک سپهر',
    'الکترونیک کارت دماوند',
    'سایان کارت',
    'پرداخت الکترونیک سپهر',
    'سایان کارت',
    'سایان کارت',
];

function isValidPaymentGateway(str, callback) {
    const url = new URL(str);

    let theCompanyName;
    if (gateways.includes(url.hostname)) {
        const gate = gateways.findIndex((g) => g === url.hostname);
        theCompanyName = companies[gate];
        if (typeof callback === 'function') {
            callback(true, theCompanyName);
        }
    } else {
        callback(false);
    }
}

const infoEl = document.querySelector('.info');
const errorEl = document.querySelector('.error');
const successEl = document.querySelector('.success');

let errors = [],
    infos = [],
    link;

const checkLink = (e) => {
    e.preventDefault();

    errorEl.innerHTML = '';
    infoEl.innerHTML = '';
    successEl.innerHTML = '';

    errors = [];
    infos = [];
    link = document.querySelector('input').value.trim();

    if (link.length === 0) {
        infos.push('لطفا لینک را وارد کنید...');
    } else if (!isValidUrl(link)) {
        infos.push('متن وارد شده لینک نیست!');
    } else if (!isHttps(link)) {
        errors.push('خطر!!! لینک وارد شده از پروتکل https استفاده نمیکند!');
    } else {
        isValidPaymentGateway(link, (valid, company) => {
            if (!valid) {
                errors.push('خطر!!! لینک وارد شده در لیست درگاه های معتبر یافت نشد!');
            } else {
                successEl.innerHTML = `لینک معتبر و متعلق به شرکت "${company}" است.`;
            }
        });
    }

    if (errors.length > 0) {
        errorEl.innerHTML = errors[0];
    }

    if (infos.length > 0) {
        infoEl.textContent = infos[0];
    }
};

document.getElementById('form').addEventListener('submit', checkLink);
document.getElementById('link-input').addEventListener('input', checkLink);
