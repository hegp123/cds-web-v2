import "moment/locale/es";
/**
 * desloguea de la aplicacion
 * @param {redirect} historyPush
 */
export let logout = historyPush => {
  sessionStorage.removeItem("user");
  historyPush.push("/login");
};

export let numberFilter = number => {
  let pattern = {
    gSize: 3,
    lgSize: 3,
    macFrac: 0,
    maxFrac: 3,
    minFrac: 0,
    minInt: 1,
    negPre: "-",
    negSuf: "",
    posPre: "",
    posSuf: ""
  };
  return formatNumber(number, pattern, ".", ",", undefined);
};

export let dateFormat = dateToFormat => {
  let moment = require("moment");
  return moment(dateToFormat).format("dddd, D [de] MMMM [de] YYYY");
};

export let dateFormatParameter = (dateToFormat, format) => {
  let moment = require("moment");
  return moment(dateToFormat).format(format);
};

export let isEmpty = stringParameter => {
  return (
    stringParameter === "" ||
    stringParameter === null ||
    stringParameter === undefined
  );
};

function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
  if (!isFinite(number)) return "";
  var DECIMAL_SEP = ".";
  var isNegative = number < 0;
  number = Math.abs(number);
  var numStr = number + "",
    formatedText = "",
    parts = [];

  var hasExponent = false;
  if (numStr.indexOf("e") !== -1) {
    var match = numStr.match(/([\d]+)e(-?)(\d+)/);
    if (match && match[2] === "-" && match[3] > fractionSize + 1) {
      number = 0;
    } else {
      formatedText = numStr;
      hasExponent = true;
    }
  }

  if (!hasExponent) {
    var fractionLen = (numStr.split(DECIMAL_SEP)[1] || "").length;

    // determine fractionSize if it is not specified
    if (typeof fractionSize === "undefined") {
      fractionSize = Math.min(
        Math.max(pattern.minFrac, fractionLen),
        pattern.maxFrac
      );
    }

    number = +(
      Math.round(+(number.toString() + "e" + fractionSize)).toString() +
      "e" +
      -fractionSize
    );

    var fraction = ("" + number).split(DECIMAL_SEP);
    var whole = fraction[0];
    fraction = fraction[1] || "";

    var i,
      pos = 0,
      lgroup = pattern.lgSize,
      group = pattern.gSize;

    if (whole.length >= lgroup + group) {
      pos = whole.length - lgroup;
      for (i = 0; i < pos; i++) {
        if ((pos - i) % group === 0 && i !== 0) {
          formatedText += groupSep;
        }
        formatedText += whole.charAt(i);
      }
    }

    for (i = pos; i < whole.length; i++) {
      if ((whole.length - i) % lgroup === 0 && i !== 0) {
        formatedText += groupSep;
      }
      formatedText += whole.charAt(i);
    }

    // format fraction part.
    while (fraction.length < fractionSize) {
      fraction += "0";
    }

    if (fractionSize && fractionSize !== "0")
      formatedText += decimalSep + fraction.substr(0, fractionSize);
  } else {
    if (fractionSize > 0 && number < 1) {
      formatedText = number.toFixed(fractionSize);
      number = parseFloat(formatedText);
    }
  }

  if (number === 0) {
    isNegative = false;
  }

  parts.push(
    isNegative ? pattern.negPre : pattern.posPre,
    formatedText,
    isNegative ? pattern.negSuf : pattern.posSuf
  );
  return parts.join("");
}
