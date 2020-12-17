(function(W, D) {
    W.$memberJoin = W.$memberJoin || {};

    /**
     * 아이디 중복확인 버튼 클릭 상태를 저장 (회원가입버튼 클릭시 'N'으로 초기화됨)
     */
    //let isMemberChecked;

    $memberJoin.event = {
        isMemberChecked : "",

        /**
         * @name duplChk
         * @description 회원가입의 아이디 중복확인 버튼 클릭시 실행한다.
         */
        duplChk: function () {
            /* $("#btn_duplChk").click(function () {*/
            let memberId = $('#memberIdModal').val();
            $.ajax({
                type: 'get',
                url: '/member/checkid',
                data: {
                   "memberId" : memberId
                },
                dataType: "json",
                contentType: "application/json; charset=utf-8;",
                success: function (data) {
                    $memberJoin.event.isMemberChecked = 'N';
                    if(memberId == ""){
                        $("#id_check").text("아이디를 입력해주세요.");
                        $("#id_check").css("color", "black");
                        $("#reg_submit").attr("disabled", false);
                    }else if (data.result==false) {
                        $("#id_check").text("사용중인 아이디입니다");
                        $("#id_check").css("color", "red");
                        $("#reg_submit").attr("disabled", true);}
                    else {
                            $('#id_check').text('사용 가능한 아이디 입니다.');
                            $("#id_check").css("color", "black");
                            $("#reg_submit").attr("disabled", false);
                        $memberJoin.event.isMemberChecked = 'Y';
                        }
                    }
                , error: function () {
                    console.log("실패");
                }
            });
        },
        datePicker: function () {
            $('.memberDatepickerfunc').datetimepicker({format: 'YYYY-MM-DD'});

        }

    }

    $memberJoin.request = {

        /**
         * @name doRegister
         * @description 회원가입창의 등록버튼 클릭시 실행한다.
         * @returns {boolean}
         */
        doRegister : function() {
            /*$("#reg_submit").click(function () {*/
            let memberId = $('#memberIdModal').val();
            let id_check = $('#id_check').val();
            let memberPw = $('#memberPwModal').val();
            let member_pw_chk = $('#member_pw_chk').val();
            let memberName = $('#memberName').val();
            let memberAddress = $('#memberAddress').val();
            let memberBirth = $('#memberBirth').val();
            let form = {
                memberId: $('#memberIdModal').val(),
                memberName: $('#memberName').val(),
                memberAddress: $('#memberAddress').val(),
                memberPw: $('#memberPwModal').val(),
                memberBirth: $('#memberBirth').val()
            };
            console.log(memberBirth);
            if(!memberId) {
                alert("아이디를 입력하세요");
                return false;
            }
            if(!memberName) {
                alert("이름을 입력하세요");
                return false;
            }
            if(!memberAddress) {
                alert("주소를 입력하세요");
                return false;
            }
            if(!memberPw) {
                alert("비밀번호를 입력하세요");
                return false;
            }
            if(!memberBirth) {
                alert("생년월일을 입력하세요");
                return false;
            }
            let datatimeRegexp = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;

            if ( !datatimeRegexp.test($('#memberBirth').val()) ) {
                alert("날짜는 yyyy-mm-dd 형식으로 입력해주세요.");
                return false;
            }
            if ($memberJoin.event.isMemberChecked!='Y'){
                alert("아이디 중복체크를 해주시기 바랍니다.");
                return false;
            }
            if (memberPw !== member_pw_chk){
                $('#pw_check').text('비밀번호가 일치하지 않습니다.');
                $('#pw_check').css('color', 'red');
                return false;
            }else {
                $.ajax({
                    type: "POST",
                    url: "/member/register",
                    data: JSON.stringify(form),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8;",
                    success: function (result) {
                        console.log(this);
                        console.log(result.result)
                        $('.inputbox').val('');
                        $('.inputbox').text('');
                        alert('회원가입이 완료되었습니다.')
                        $memberJoin.event.isMemberChecked = 'N';
                        $('#memberModal').modal('hide');
                    },
                    error: function (request, status, error) {
                        alert("code:" + request.status + "\n" + "error:" + error);
                    }
                });
            }
            /*});*/
        }
    }
})(window, document);