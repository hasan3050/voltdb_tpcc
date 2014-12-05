﻿var adminDOMObjects = {};
var adminEditObjects = {};

$(document).ready(function () {

    adminDOMObjects = {
        siteNumberHeader: $("#sitePerHost"),
        kSafety: $("#kSafety"),
        partitionDetection: $("#partitionDetectionIcon"),
        partitionDetectionLabel: $("#partitionDetectionLabel"),
        security: $('#securityOptionIcon'),
        securityLabel: $("#spanSecurity"),
        httpAccess: $("#httpAccessIcon"),
        httpAccessLabel: $("#httpAccessLabel"),
        jsonAPI: $("#jsonAPIIcon"),
        jsonAPILabel: $("#txtJsonAPI"),
        autoSnapshot: $("#autoSnapshotIcon"),
        autoSnapshotLabel: $("#txtAutoSnapshot"),
        frequency: $("#txtFrequency"),
        frequencyLabel: $("#spanFrequencyUnit"),
        retained: $("#retainedSpan"),
        retainedLabel: $("#txtRetained"),
        commandLog: $("#commandLogIcon"),
        commandLogLabel: $("#commandLogLabel"),
        commandLogFrequencyTime: $("#commandLogFrequencyTime"),
        commandLogFrequencyTimeLabel: $("#commandLogFrequencyUnit"),
        commandLogFrequencyTransactions: $("#commandLogFrequencyTxns"),
        commandLogSegmentSize: $("#commandLogSegmentSize"),
        commandLogSegmentSizeLabel: $("#commandLogSegmentSizeUnit"),
        exports: $("#exports"),
        exportLabel: $("#txtExportLabel"),
        target: $("#target"),
        properties: $("#properties"),
        maxJavaHeap: $("#maxJavaHeap"),
        maxJavaHeapLabel: $("#maxJavaHeapUnit"),
        heartBeatTimeout: $("#hrtTimeOutSpan"),
        heartBeatTimeoutLabel: $("#hrtTimeOutUnitSpan"),
        queryTimeout: $("#txtQueryTimeout"),
        queryTimeoutLabel: $("#queryTimeOutUnitSpan"),
        tempTablesMaxSize: $("#temptablesmaxsize"),
        tempTablesMaxSizeLabel: $("#temptablesmaxsizeUnit"),
        snapshotPriority: $("#snapshotpriority"),
        clientPort: $('#clientport'),
        adminPort: $('#adminport'),
        httpPort: $('#httpport'),
        internalPort: $('#internalPort'),
        zookeeperPort: $('#zookeeperPort'),
        replicationPort: $('#replicationPort'),
        voltdbRoot: $('#voltdbroot'),
        snapshotPath: $('#snapshotpath'),
        exportOverflow: $('#exportOverflow'),
        commandLogPath: $('#commandlogpath'),
        commandLogSnapshotPath: $('#commandlogsnapshotpath')
    };

    adminEditObjects = {

        //Edit Security objects
        btnEditSecurityOk: $("#btnEditSecurityOk"),
        btnEditSecurityCancel: $("#btnEditSecurityCancel"),
        LinkSecurityEdit: $("#securityEdit"),
        chkSecurity: $("#chkSecurity"),
        chkSecurityValue: $("#chkSecurity").is(":checked"),
        iconSecurityOption: $("#securityOptionIcon"),
        spanSecurity: $("#spanSecurity"),

        //Edit Auto Snapshot objects
        btnEditAutoSnapshotOk: $("#btnEditAutoSnapshotOk"),
        btnEditAutoSnapshotCancel: $("#btnEditAutoSnapshotCancel"),
        LinkAutoSnapshotEdit: $("#autoSnapshotEdit"),
        chkAutoSnapsot: $("#chkAutoSnapshot"),
        chkAutoSnapshotValue: $("#chkAutoSnapshot").is(":checked"),
        iconAutoSnapshotOption: $("#autoSnapshotIcon"),
        txtAutoSnapshot: $("#txtAutoSnapshot"),
        //Frequency objects
        tBoxAutoSnapshotFreq: $("#txtFrequency"),
        tBoxAutoSnapshotFreqValue: $("#frequencySpan").text(),
        spanAutoSnapshotFreq: $("#frequencySpan"),
        ddlAutoSnapshotFreqUnit: $("#ddlfrequencyUnit"),
        ddlAutoSnapshotFreqUnitValue: $("#spanFrequencyUnit").text(),
        spanAutoSnapshotFreqUnit: $("#spanFrequencyUnit"),
        //Retained objects
        tBoxAutoSnapshotRetained: $("#txtRetained"),
        tBoxAutoSnapshotRetainedValue: $("#retainedSpan").text(),
        spanAutoSnapshotRetained: $("#retainedSpan"),

        //Heartbeat Timeout
        btnEditHeartbeatTimeoutOk: $("#btnEditHeartbeatTimeoutOk"),
        btnEditHeartbeatTimeoutCancel: $("#btnEditHeartbeatTimeoutCancel"),
        LinkHeartbeatEdit: $("#btnEditHrtTimeOut"),
        tBoxHeartbeatTimeout: $("#txtHrtTimeOut"),
        tBoxHeartbeatTimeoutValue: $("#hrtTimeOutSpan").text(),
        spanHeartbeatTimeOut: $("#hrtTimeOutSpan"),

        //Query Timeout
        btnEditQueryTimeoutOk: $("#btnEditQueryTimeoutOk"),
        btnEditQueryTimeoutCancel: $("#btnEditQueryTimeoutCancel"),
        LinkQueryTimeoutEdit: $("#btnEditQueryTimeout"),
        tBoxQueryTimeout: $("#txtQueryTimeout"),
        tBoxQueryTimeoutValue: $("#queryTimeOutSpan").text(),
        spanqueryTimeOut: $("#queryTimeOutSpan"),
    };

    adminEditObjects.chkSecurity.on('ifChanged', function () {
        adminEditObjects.spanSecurity.text(getOnOffText(adminEditObjects.chkSecurity.is(":checked")));
    });

    adminEditObjects.chkAutoSnapsot.on('ifChanged', function () {
        adminEditObjects.txtAutoSnapshot.text(getOnOffText(adminEditObjects.chkAutoSnapsot.is(":checked")));
    });

    $(".tblshutdown").find(".edit").on("click", function () {
        var $this = $(this).closest("tr");

        var tdVal = $this.find("td:nth-child(3)");
        var val = tdVal.text();

        if (val == "On") {
            $this.find("td:nth-child(2)").find("div").removeClass("onIcon").addClass("offIcon");
            tdVal.text("Off");
        } else {
            $this.find("td:nth-child(2)").find("div").removeClass("offIcon").addClass("onIcon");
            tdVal.text("On");
        }
    });


    // Make Expandable Rows.
    $('tr.parent > td:first-child' || 'tr.parent > td:fourth-child')
        .css("cursor", "pointer")
        .attr("title", "Click to expand/collapse")
        .click(function () {
            var parent = $(this).parent();
            parent.siblings('.child-' + parent.attr("id")).toggle();
            parent.find(".labelCollapsed").toggleClass("labelExpanded");
        });
    $('tr[class^=child-]').hide().children('td');

    // btnServerConfigAdmin
    $('#btnServerConfigAdmin').click(function () {
        $('#serverConfigAdmin').slideToggle("slide");
    });

    $('#serverName').click(function () {
        $('#serverConfigAdmin').slideToggle("slide");
    });

    // Implements Scroll in Server List div
    $('#serverListWrapperAdmin').slimscroll({
        disableFadeOut: true,
        height: '225px'
    });

    $('#shutDownConfirmation').popup();

    $('#pauseConfirmation').popup({
        open: function (event, ui, ele) {
        },
        afterOpen: function () {

            $("#btnPauseConfirmationOk").unbind("click");
            $("#btnPauseConfirmationOk").on("click", function () {

                $("#pauseConfirmation").hide();
                $("#resumeConfirmation").show();

                //Close the popup
                $($(this).siblings()[0]).trigger("click");
            });
        }
    });

    $('#resumeConfirmation').popup({
        open: function (event, ui, ele) {
        },
        afterOpen: function () {

            $("#btnResumeConfirmationOk").unbind("click");
            $("#btnResumeConfirmationOk").on("click", function () {

                $("#resumeConfirmation").hide();
                $("#pauseConfirmation").show();

                //Close the popup
                $($(this).siblings()[0]).trigger("click");
            });
        }
    });

    var toggleSecurityEdit = function (showEdit) {

        if (adminEditObjects.chkSecurityValue) {
            adminEditObjects.chkSecurity.iCheck('check');
        } else {
            adminEditObjects.chkSecurity.iCheck('uncheck');
        }
        adminEditObjects.spanSecurity.text(getOnOffText(adminEditObjects.chkSecurityValue));

        if (showEdit) {
            adminEditObjects.chkSecurity.parent().removeClass("customCheckbox");
            adminEditObjects.btnEditSecurityOk.hide();
            adminEditObjects.btnEditSecurityCancel.hide();
            adminEditObjects.LinkSecurityEdit.show();
            adminEditObjects.iconSecurityOption.show();
        } else {
            adminEditObjects.iconSecurityOption.hide();
            adminEditObjects.LinkSecurityEdit.hide();
            adminEditObjects.btnEditSecurityOk.show();
            adminEditObjects.btnEditSecurityCancel.show();
            adminEditObjects.chkSecurity.parent().addClass("customCheckbox");
        }
    };

    adminEditObjects.LinkSecurityEdit.on("click", function () {
        toggleSecurityEdit(false);
    });

    adminEditObjects.btnEditSecurityCancel.on("click", function () {
        toggleSecurityEdit(true);
    });

    adminEditObjects.btnEditSecurityOk.popup({
        open: function (event, ui, ele) {
        },
        afterOpen: function () {

            $("#btnSecurityOk").unbind("click");
            $("#btnSecurityOk").on("click", function () {

                if (adminEditObjects.chkSecurity.is(':checked')) {
                    adminEditObjects.iconSecurityOption.removeClass().addClass("onIcon");
                    adminEditObjects.chkSecurityValue = true;
                } else {
                    adminEditObjects.iconSecurityOption.removeClass().addClass("offIcon");
                    adminEditObjects.chkSecurityValue = false;
                }

                //Close the popup
                $($(this).siblings()[0]).trigger("click");
            });

            $("#btnPopupSecurityCancel").on("click", function () {
                toggleSecurityEdit(true);
            });

            $(".popup_back").on("click", function () {
                toggleSecurityEdit(true);
            });

            $(".popup_close").on("click", function () {
                toggleSecurityEdit(true);
            });
        }
    });


    $('#saveConfirmation').popup();
    $('#restoreConfirmation').popup();
    $('#stopConfirmation').popup({
        open: function (event, ui, ele) {
        },
        afterOpen: function () {

            $("#StoptConfirmOK").unbind("click");
            $("#StoptConfirmOK").on("click", function () {

                $("#stopConfirmation").hide();
                $("#startConfirmation").show();

                //Close the popup
                $($(this).siblings()[0]).trigger("click");
            });
        }
    });


    $('#startConfirmation').popup({
        open: function (event, ui, ele) {
        },
        afterOpen: function () {

            $("#startConfirmOk").unbind("click");
            $("#startConfirmOk").on("click", function () {

                $("#startConfirmation").hide();
                $("#stopConfirmation").show();

                //Close the popup
                $($(this).siblings()[0]).trigger("click");
            });
        }
    });


    var toggleAutoSnapshotEdit = function (showEdit) {

        if (adminEditObjects.chkAutoSnapshotValue) {
            adminEditObjects.chkAutoSnapsot.iCheck('check');
        } else {
            adminEditObjects.chkAutoSnapsot.iCheck('uncheck');
        }

        adminEditObjects.tBoxAutoSnapshotFreq.val(adminEditObjects.tBoxAutoSnapshotFreqValue);
        adminEditObjects.tBoxAutoSnapshotRetained.val(adminEditObjects.tBoxAutoSnapshotRetainedValue);
        adminEditObjects.ddlAutoSnapshotFreqUnit.val(adminEditObjects.ddlAutoSnapshotFreqUnitValue);
        adminEditObjects.txtAutoSnapshot.text(getOnOffText(adminEditObjects.chkAutoSnapshotValue));

        if (showEdit) {
            adminEditObjects.chkAutoSnapsot.parent().removeClass("customCheckbox");
            adminEditObjects.btnEditAutoSnapshotOk.hide();
            adminEditObjects.btnEditAutoSnapshotCancel.hide();
            adminEditObjects.LinkAutoSnapshotEdit.show();
            adminEditObjects.iconAutoSnapshotOption.show();

            adminEditObjects.tBoxAutoSnapshotFreq.hide();
            adminEditObjects.ddlAutoSnapshotFreqUnit.hide();
            adminEditObjects.tBoxAutoSnapshotRetained.hide();
            adminEditObjects.spanAutoSnapshotFreq.show();
            adminEditObjects.spanAutoSnapshotFreqUnit.show();
            adminEditObjects.spanAutoSnapshotRetained.show();
        } else {
            adminEditObjects.iconAutoSnapshotOption.hide();
            adminEditObjects.LinkAutoSnapshotEdit.hide();
            adminEditObjects.btnEditAutoSnapshotOk.show();
            adminEditObjects.btnEditAutoSnapshotCancel.show();
            adminEditObjects.chkAutoSnapsot.parent().addClass("customCheckbox");

            adminEditObjects.spanAutoSnapshotFreqUnit.hide();
            adminEditObjects.spanAutoSnapshotFreq.hide();
            adminEditObjects.spanAutoSnapshotRetained.hide();
            adminEditObjects.tBoxAutoSnapshotFreq.show();
            adminEditObjects.ddlAutoSnapshotFreqUnit.show();
            adminEditObjects.tBoxAutoSnapshotRetained.show();
        }
    };

    adminEditObjects.btnEditAutoSnapshotCancel.on("click", function () {
        toggleAutoSnapshotEdit(true);
    });

    adminEditObjects.btnEditAutoSnapshotOk.popup({
        open: function (event, ui, ele) {
        },
        afterOpen: function () {

            $("#btnSaveSnapshot").unbind("click");
            $("#btnSaveSnapshot").on("click", function () {

                if (adminEditObjects.chkAutoSnapsot.is(':checked')) {
                    adminEditObjects.iconAutoSnapshotOption.removeClass().addClass("onIcon");
                    adminEditObjects.chkAutoSnapshotValue = true;
                } else {
                    adminEditObjects.iconAutoSnapshotOption.removeClass().addClass("offIcon");
                    adminEditObjects.chkAutoSnapshotValue = false;
                }

                adminEditObjects.tBoxAutoSnapshotFreqValue = adminEditObjects.tBoxAutoSnapshotFreq.val();
                adminEditObjects.ddlAutoSnapshotFreqUnitValue = adminEditObjects.ddlAutoSnapshotFreqUnit.val();
                adminEditObjects.tBoxAutoSnapshotRetainedValue = adminEditObjects.tBoxAutoSnapshotRetained.val();

                adminEditObjects.spanAutoSnapshotFreq.html(adminEditObjects.tBoxAutoSnapshotFreqValue);
                adminEditObjects.spanAutoSnapshotFreqUnit.html(adminEditObjects.ddlAutoSnapshotFreqUnitValue);
                adminEditObjects.spanAutoSnapshotRetained.html(adminEditObjects.tBoxAutoSnapshotRetainedValue);

                //Close the popup
                $($(this).siblings()[0]).trigger("click");
            });

            $("#btnPopupAutoSnapshotCancel").on("click", function () {
                toggleAutoSnapshotEdit(true);
            });

            $(".popup_back").on("click", function () {
                toggleAutoSnapshotEdit(true);
            });

            $(".popup_close").on("click", function () {
                toggleAutoSnapshotEdit(true);
            });
        }
    });

    adminEditObjects.LinkAutoSnapshotEdit.click(function () {
        var parent = $(this).parent().parent();
        parent.siblings('.child-' + parent.attr("id")).show();
        parent.find(".labelCollapsed").addClass("labelExpanded");
        toggleAutoSnapshotEdit(false);
    });

    //Heartbeat time out
    var toggleHeartbeatTimeoutEdit = function (showEdit) {

        adminEditObjects.tBoxHeartbeatTimeout.val(adminEditObjects.tBoxHeartbeatTimeoutValue);

        if (showEdit) {
            adminEditObjects.btnEditHeartbeatTimeoutOk.hide();
            adminEditObjects.btnEditHeartbeatTimeoutCancel.hide();
            adminEditObjects.LinkHeartbeatEdit.show();

            adminEditObjects.tBoxHeartbeatTimeout.hide();
            adminEditObjects.spanHeartbeatTimeOut.show();
        } else {
            adminEditObjects.LinkHeartbeatEdit.hide();
            adminEditObjects.btnEditHeartbeatTimeoutOk.show();
            adminEditObjects.btnEditHeartbeatTimeoutCancel.show();

            adminEditObjects.spanHeartbeatTimeOut.hide();
            adminEditObjects.tBoxHeartbeatTimeout.show();
        }
    };

    adminEditObjects.LinkHeartbeatEdit.on("click", function () {
        toggleHeartbeatTimeoutEdit(false);
        $("td.heartbeattd span").toggleClass("unit");
    });

    adminEditObjects.btnEditHeartbeatTimeoutCancel.on("click", function () {
        toggleHeartbeatTimeoutEdit(true);
    });

    adminEditObjects.btnEditHeartbeatTimeoutOk.popup({
        open: function (event, ui, ele) {
        },
        afterOpen: function () {

            $("#btnPopupHeartbeatTimeoutOk").unbind("click");
            $("#btnPopupHeartbeatTimeoutOk").on("click", function () {

                adminEditObjects.tBoxHeartbeatTimeoutValue = adminEditObjects.tBoxHeartbeatTimeout.val();
                adminEditObjects.spanHeartbeatTimeOut.html(adminEditObjects.tBoxHeartbeatTimeoutValue);

                //Close the popup
                $($(this).siblings()[0]).trigger("click");
            });

            $("#btnPopupHeartbeatTimeoutCancel").on("click", function () {
                toggleHeartbeatTimeoutEdit(true);
            });

            $(".popup_back").on("click", function () {
                toggleHeartbeatTimeoutEdit(true);
            });

            $(".popup_close").on("click", function () {
                toggleHeartbeatTimeoutEdit(true);
            });
        }
    });

    //Query time out
    var toggleQueryTimeoutEdit = function (showEdit) {

        adminEditObjects.tBoxQueryTimeout.val(adminEditObjects.tBoxQueryTimeoutValue);

        if (showEdit) {
            adminEditObjects.btnEditQueryTimeoutOk.hide();
            adminEditObjects.btnEditQueryTimeoutCancel.hide();
            adminEditObjects.LinkQueryTimeoutEdit.show();

            adminEditObjects.tBoxQueryTimeout.hide();
            adminEditObjects.spanqueryTimeOut.show();
        } else {
            adminEditObjects.LinkQueryTimeoutEdit.hide();
            adminEditObjects.btnEditQueryTimeoutOk.show();
            adminEditObjects.btnEditQueryTimeoutCancel.show();

            adminEditObjects.spanqueryTimeOut.hide();
            adminEditObjects.tBoxQueryTimeout.show();
        }
    };

    adminEditObjects.LinkQueryTimeoutEdit.on("click", function () {
        toggleQueryTimeoutEdit(false);
        $("td.queryTimeOut span").toggleClass("unit");
    });

    adminEditObjects.btnEditQueryTimeoutCancel.on("click", function () {
        toggleQueryTimeoutEdit(true);
    });

    adminEditObjects.btnEditQueryTimeoutOk.popup({
        open: function (event, ui, ele) {
        },
        afterOpen: function () {

            $("#btnPopupQueryTimeoutOk").unbind("click");
            $("#btnPopupQueryTimeoutOk").on("click", function () {

                adminEditObjects.tBoxQueryTimeoutValue = adminEditObjects.tBoxQueryTimeout.val();
                adminEditObjects.spanqueryTimeOut.html(adminEditObjects.tBoxQueryTimeoutValue);

                //Close the popup
                $($(this).siblings()[0]).trigger("click");
            });

            $("#btnPopupQueryTimeoutCancel").on("click", function () {
                toggleQueryTimeoutEdit(true);
            });

            $(".popup_back").on("click", function () {
                toggleQueryTimeoutEdit(true);
            });

            $(".popup_close").on("click", function () {
                toggleQueryTimeoutEdit(true);
            });
        }
    });

    // Filters servers list
    $('#popServerSearchAdmin').keyup(function () {
        var that = this;
        $.each($('.tblshutdown tbody tr'),
        function (i, val) {
            if ($(val).text().indexOf($(that).val().toLowerCase()) == -1) {
                $('.tblshutdown tbody tr').eq(i).hide();
            } else {
                $('.tblshutdown tbody tr').eq(i).show();
            }
        });
    });

    // Hides opened serverlist
    $(document).on('click', function (e) {
        if (!$(event.target).hasClass('adminIcons') && !$(event.target).hasClass('serverName')) {
            if ($(e.target).closest("#serverConfigAdmin").length === 0) {
                $("#serverConfigAdmin").hide();
            }
        }
    });

    // Checkbox style


    $('input.snapshot').iCheck({
        checkboxClass: 'icheckbox_square-aero',
        increaseArea: '20%' // optional

    });

    $('#chkSecurity').iCheck({
        checkboxClass: 'icheckbox_square-aero',
        increaseArea: '20%' // optional
    });
});

(function (window) {
    var iVoltDbAdminConfig = (function () {

        this.isAdmin = true;

        this.displayAdminConfiguration = function (adminConfigValues) {
            if (adminConfigValues != undefined) {
                configureAdminValues(adminConfigValues);
                configurePortValues(adminConfigValues);
                configureDirectoryValues(adminConfigValues);
            }
        };

        this.displayClientPort = function (clientPortValue) {
            if (clientPortValue != undefined) {
                configureClientPortValue(clientPortValue);
            }
        };

        var configureAdminValues = function (adminConfigValues) {
            adminDOMObjects.siteNumberHeader.text(adminConfigValues.sitesperhost);
            adminDOMObjects.kSafety.text(adminConfigValues.kSafety);
            adminDOMObjects.partitionDetection.removeClass().addClass(getOnOffClass(adminConfigValues.partitionDetection));
            adminDOMObjects.partitionDetectionLabel.text(getOnOffText(adminConfigValues.partitionDetection));
            adminDOMObjects.security.removeClass().addClass(getOnOffClass(adminConfigValues.securityEnabled));
            adminDOMObjects.securityLabel.text(getOnOffText(adminConfigValues.securityEnabled));
            adminDOMObjects.httpAccess.removeClass().addClass(getOnOffClass(adminConfigValues.httpEnabled));
            adminDOMObjects.httpAccessLabel.text(getOnOffText(adminConfigValues.httpEnabled));
            adminDOMObjects.jsonAPI.removeClass().addClass(getOnOffClass(adminConfigValues.jsonEnabled));
            adminDOMObjects.jsonAPILabel.text(getOnOffText(adminConfigValues.jsonEnabled));
            adminDOMObjects.autoSnapshot.removeClass().addClass(getOnOffClass(adminConfigValues.snapshotEnabled));
            adminDOMObjects.autoSnapshotLabel.text(getOnOffText(adminConfigValues.snapshotEnabled));
            adminDOMObjects.frequency.text(adminConfigValues.frequency);
            adminDOMObjects.frequencyLabel.text(adminConfigValues.frequency > 0 ? "Hrs" : "");
            adminDOMObjects.retained.text(adminConfigValues.retained);
            adminDOMObjects.retainedLabel.text(adminConfigValues.retained > 0 ? "Copies" : "");
            adminDOMObjects.commandLog.removeClass().addClass(getOnOffClass(adminConfigValues.commandLogEnabled));
            adminDOMObjects.commandLogLabel.text(adminConfigValues.commandLogEnabled == 'true' ? 'On' : 'Off');
            adminDOMObjects.commandLogFrequencyTime.text(adminConfigValues.commandLogFrequencyTime);
            adminDOMObjects.commandLogFrequencyTimeLabel.text(adminConfigValues.commandLogFrequencyTime > 0 ? "ms" : "");
            adminDOMObjects.commandLogFrequencyTransactions.text(adminConfigValues.commandLogFrequencyTransactions);
            adminDOMObjects.commandLogSegmentSize.text(adminConfigValues.logSegmentSize);
            adminDOMObjects.commandLogSegmentSizeLabel.text(adminConfigValues.logSegmentSize > 0 ? "MB" : "");
            adminDOMObjects.exports.removeClass().addClass(getOnOffClass(adminConfigValues.export));
            adminDOMObjects.exportLabel.text(getOnOffText(adminConfigValues.export));
            adminDOMObjects.target.text(adminConfigValues.targets);
            adminDOMObjects.maxJavaHeap.text(adminConfigValues.maxJavaHeap);
            adminDOMObjects.maxJavaHeapLabel.text(adminConfigValues.maxJavaHeap > 0 ? "MB" : "");
            adminDOMObjects.heartBeatTimeout.text(adminConfigValues.heartBeatTimeout);
            adminDOMObjects.heartBeatTimeoutLabel.text(adminConfigValues.heartBeatTimeout > 0 ? "ms" : "");
            adminDOMObjects.queryTimeout.text(adminConfigValues.queryTimeout);
            adminDOMObjects.queryTimeoutLabel.text(adminConfigValues.queryTimeout > 0 ? "ms" : "");
            adminDOMObjects.tempTablesMaxSize.text(adminConfigValues.tempTablesMaxSize);
            adminDOMObjects.tempTablesMaxSizeLabel.text(adminConfigValues.tempTablesMaxSize > 0 ? "MB" : "");
            adminDOMObjects.snapshotPriority.text(adminConfigValues.snapshotPriority);

            adminEditObjects.tBoxHeartbeatTimeoutValue = adminConfigValues.heartBeatTimeout;

        };

        var configurePortValues = function (portConfigValues) {
            adminDOMObjects.adminPort.text(portConfigValues.adminPort);
            adminDOMObjects.httpPort.text(portConfigValues.httpPort);
            adminDOMObjects.internalPort.text(portConfigValues.internalPort);
            adminDOMObjects.zookeeperPort.text(portConfigValues.zookeeperPort);
            adminDOMObjects.replicationPort.text(portConfigValues.replicationPort);

        };

        var configureClientPortValue = function (clientPortValue) {
            adminDOMObjects.clientPort.text(clientPortValue.clientPort);

        };

        var configureDirectoryValues = function (directoryConfigValues) {
            adminDOMObjects.voltdbRoot.text(directoryConfigValues.voltdbRoot);
            adminDOMObjects.snapshotPath.text(directoryConfigValues.snapshotPath);
            adminDOMObjects.commandLogPath.text(directoryConfigValues.commandLogPath);
            adminDOMObjects.commandLogSnapshotPath.text(directoryConfigValues.commandLogSnapshotPath);

        };

    });
    window.VoltDbAdminConfig = VoltDbAdminConfig = new iVoltDbAdminConfig();

})(window);


//common functions
var getOnOffText = function (isChecked) {
    return (isChecked) ? "On" : "Off";
};

var getOnOffClass = function (isOn) {
    return (isOn) ? "onIcon" : "offIcon";
};