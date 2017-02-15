// Base starting stats. All fives.
base_stats = {
		"body": 5,
		"heart": 5,
		"stamina": 5,
		"strength": 5,
		"skill": 5,
		"dexterity": 5,
		"magic": 5,
		"spirit": 5,
}

// +1 Stat bonus granted by picking a weapon at character creation.
weapon_stats = {
		"sword": "heart",
		"dual_swords": "skill",
		"spear": "body",
		"axe": "strength",
		"kusarigama": "dexterity"
}

// +1 Stat bonus granted by picking a guardian spirit at character creation.
spirit_stats = {
		"kato": "strength",
		"isonade": "spirit",
		"daiba_washi": "skill"
}

// Copy base stats into a new object to be calculated with.
function copy_base_stats() {
		ret = {}

		// Should be fine as base_stats doesn't have anything fancy in.
		for (var attr in base_stats) {
				ret[attr] = base_stats[attr]
		}
		return ret
}

// Increase stats based on initial weapon/spirit choices.
function calculate_starting_bonuses(stats) {
		var weap_1_stat = weapon_stats[document.getElementById("starting_weapon_1").value]
		stats[weap_1_stat] += 1
		
		var weap_2_stat = weapon_stats[document.getElementById("starting_weapon_2").value]
		stats[weap_2_stat] += 1

		var spirit_stat = spirit_stats[document.getElementById("starting_guardian_spirit").value]
		stats[spirit_stat] += 1

}

// Calculate all stats and update page with new values.
function calculate() {
		console.log("Calculating")

		var stats = copy_base_stats()

		calculate_starting_bonuses(stats)
		
		console.log(stats)
		for (var attr in stats) {
				document.getElementById(attr).innerHTML = stats[attr]
		}
}
