// Nioh stat calculator code.
"use strict";

// Base starting stats. All fives.
var base_stats = {
	"body": 5,
	"heart": 5,
	"stamina": 5,
	"strength": 5,
	"skill": 5,
	"dexterity": 5,
	"magic": 5,
	"spirit": 5,
};

// +1 Stat bonus granted by picking a weapon at character creation.
var weapon_stats = {
	"sword": "heart",
	"dual_swords": "skill",
	"spear": "body",
	"axe": "strength",
	"kusarigama": "dexterity"
};

// +1 Stat bonus granted by picking a guardian spirit at character creation.
var spirit_stats = {
	"kato": "strength",
	"isonade": "spirit",
	"daiba_washi": "skill"
};

// List of ids of all widgets that need their values imported/exported.
// Basically, all the user input.
var serializable_controls = [
	"body_levels",
	"heart_levels",
	"stamina_levels",
	"strength_levels",
	"skill_levels",
	"dexterity_levels",
	"magic_levels",
	"spirit_levels",
	"starting_weapon_1",
	"starting_weapon_2",
	"starting_guardian_spirit"
];

// Helper function to get the currently set levels in a stat.
function levels(stat) {
	return parseInt(document.getElementById(stat + "_levels").value);
}

// Callback for stat level +/- buttons.
function level_counter(stat, change) {
	var s_levels = levels(stat);
	var new_levels = Math.max(0, s_levels + change);
	document.getElementById(stat + "_levels").value = new_levels;

	// Update everything else if there has been a change.
	if (s_levels != new_levels) {
		calculate();
	}
}

// Callback for typing in a stat level value.
function set_level_counter(stat) {
	var s_levels = levels(stat);
	var new_levels = Math.max(0, s_levels);
	document.getElementById(stat + "_levels").value = new_levels;

	// Update everything else. We have to assume a change.
	calculate();
}

// Copy base stats into a new object to be calculated with.
function copy_base_stats() {
	var ret = {};

	// Should be fine as base_stats doesn't have anything fancy in.
	for (var attr in base_stats) {
		ret[attr] = base_stats[attr];
	}
	
	return ret;
}

// Increase stats based on initial weapon/spirit choices.
function calculate_starting_bonuses(stats) {
	var weap_1_stat = weapon_stats[document.getElementById("starting_weapon_1").value];
	stats[weap_1_stat] += 1;
	
	var weap_2_stat = weapon_stats[document.getElementById("starting_weapon_2").value];
	stats[weap_2_stat] += 1;

	var spirit_stat = spirit_stats[document.getElementById("starting_guardian_spirit").value];
	stats[spirit_stat] += 1;
}

// Increase stats based on level values and calculate char level required.
function calculate_levels(stats) {
	var total_levels = 1;
	for (var stat in base_stats) {
		var s_levels = levels(stat);
		stats[stat] += s_levels;
		total_levels += s_levels;
	}
	stats["level"] = total_levels;
}

// Calculate total samurai skill points from stats/level.
function calculate_samurai_points(stats) {
	var points = 0;
	points += Math.floor(stats.level / 5) * 2;
	points += Math.floor(levels("body") / 2);
	points += Math.floor(levels("heart") / 2);
	points += Math.floor(levels("stamina") / 2);
	points += Math.floor(levels("strength") / 2);
	points += Math.floor(levels("skill") / 2);
	stats["samurai_skill_points"] = points;
}

// Calculate total ninja points from dex/level.
function calculate_ninja_points(stats) {
	var points = 0;
	if (stats.level >= 5) points += 2;
	points += levels("dexterity") * 2;
	stats["ninja_skill_points"] = points;
}

// Calculate total magic points from magic.
function calculate_magic_points(stats) {
	var points = levels("magic") * 2;
	stats["magic_skill_points"] = points;
}

// Update all widgets with calculated values.
function update_widgets(stats) {
	for (var attr in stats) {
		document.getElementById(attr).innerHTML = stats[attr];
	}
}

// Compute a json string based on the current character and display it.
function update_json_box() {
	var json = {};
	for (var i = 0; i < serializable_controls.length; ++i) {
		var ctrl = serializable_controls[i];
		json[ctrl] = document.getElementById(ctrl).value;
	}
	document.getElementById("json_box").value = JSON.stringify(json);
}

// Take a json string out of the json box and update everything to those values.
function deserialize() {
	var json = JSON.parse(document.getElementById("json_box").value);
	for (var i = 0; i < serializable_controls.length; ++i) {
		var ctrl = serializable_controls[i];
		if (!(json[ctrl] === undefined)) {
			document.getElementById(ctrl).value = json[ctrl];
		}
	}
	calculate();
}

// Copy json string to clipboard. Probably doesn't work on old browsers.
function copy_json() {
	document.getElementById("json_box").select();
	document.execCommand("copy");
}

// Calculate all stats and update page with new values.
// Used as a callback for lots of widgets when they change.
function calculate() {
	// Initialise.
	var stats = copy_base_stats();

	// Do calculations.
	calculate_starting_bonuses(stats);
	calculate_levels(stats);
	calculate_samurai_points(stats);
	calculate_ninja_points(stats);
	calculate_magic_points(stats);

	// Update IO stuff.
	update_widgets(stats);
	update_json_box();
}
