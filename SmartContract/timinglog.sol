// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.6.1;
pragma experimental ABIEncoderV2;

contract timinglog {
    
    uint constant DAY_IN_SECONDS = 86400;
    uint constant YEAR_IN_SECONDS = 31536000;
    uint constant LEAP_YEAR_IN_SECONDS = 31622400;

    uint constant HOUR_IN_SECONDS = 3600;
    uint constant MINUTE_IN_SECONDS = 60;

    uint16 constant ORIGIN_YEAR = 1970;

    function isLeapYear(uint year) pure private returns (bool) {
                if (year % 4 != 0) {
                        return false;
                }
                if (year % 100 != 0) {
                        return true;
                }
                if (year % 400 != 0) {
                        return false;
                }
                return true;
    }
    
    function toTimestamp(uint year, uint month, uint day) view private returns (uint timestamp) {
                return toTimestamp(year, month, day, 0, 0, 0);
    }
    
    function toTimestamp(uint year, uint month, uint day, uint hour, uint minute, uint second) view private returns (uint timestamp) {
                uint16 i;

                // Year
                for (i = ORIGIN_YEAR; i < year; i++) {
                        if (isLeapYear(i)) {
                                timestamp += LEAP_YEAR_IN_SECONDS;
                        }
                        else {
                                timestamp += YEAR_IN_SECONDS;
                        }
                }

                // Month
                uint8[12] memory monthDayCounts;
                monthDayCounts[0] = 31;
                if (isLeapYear(year)) {
                        monthDayCounts[1] = 29;
                }
                else {
                        monthDayCounts[1] = 28;
                }
                monthDayCounts[2] = 31;
                monthDayCounts[3] = 30;
                monthDayCounts[4] = 31;
                monthDayCounts[5] = 30;
                monthDayCounts[6] = 31;
                monthDayCounts[7] = 31;
                monthDayCounts[8] = 30;
                monthDayCounts[9] = 31;
                monthDayCounts[10] = 30;
                monthDayCounts[11] = 31;

                for (i = 1; i < month; i++) {
                        timestamp += DAY_IN_SECONDS * monthDayCounts[i - 1];
                }

                // Day
                timestamp += DAY_IN_SECONDS * (day - 1);

                // Hour
                timestamp += HOUR_IN_SECONDS * (hour);

                // Minute
                timestamp += MINUTE_IN_SECONDS * (minute);

                // Second
                timestamp += second;

                return timestamp;
    }

    mapping (uint => mapping (uint => string)) internal comp_date_hash_map;
                                     // comp_date_hash_map[company][date] we get a string
    
    function append_log(uint _company, uint year, uint month, uint day, string memory _log) public returns (bool OK) {
        // check dates
        // check company account
        uint local_date = toTimestamp(year,month,day);
        bytes memory tempEmptyStringTest = bytes(comp_date_hash_map[_company][local_date]);
        require(tempEmptyStringTest.length == 0); // must be empty the log at this day 
        comp_date_hash_map[_company][local_date] = _log;
        return true;
    }
    
    function get_log(uint _company, uint year, uint month, uint day) view public returns (string memory _log) {
        uint local_date = toTimestamp(year,month,day);
        bytes memory tempEmptyStringTest = bytes(comp_date_hash_map[_company][local_date]);
        require(tempEmptyStringTest.length != 0); // must have data the log at this day
        _log = comp_date_hash_map[_company][local_date];
        return _log;
    }
}
