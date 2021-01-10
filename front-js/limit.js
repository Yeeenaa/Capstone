function characterCheck() {
    var RegExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;//정규식 구문
    var obj = document.getElementsByName("cmtTxt")[0]
        if (RegExp.test(obj.value)) {
            alert("특수문자는 입력하실 수 없습니다.");
            obj.value = obj.value.substring(0, obj.value.length - 1);
        }
}
