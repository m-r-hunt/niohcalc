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

weapon_stats = {
		"sword": "heart",
		"dual_swords": "skill",
		"spear": "body",
		"axe": "strength",
		"kusarigama": "dexterity"
}

spirit_stats = {
		"kato": "strength",
		"isonade": "spirit",
		"daiba_washi": "skill"
}

function copy_base_stats() {
		ret = {}
		
		for (var attr in base_stats) {
				ret[attr] = base_stats[attr]
		}
		return ret
}

function calculate() {
		console.log("Calculating")

		var stats = copy_base_stats()

		var weap_1_stat = weapon_stats[document.getElementById("starting_weapon_1").value]
		stats[weap_1_stat] += 1
		
		var weap_2_stat = weapon_stats[document.getElementById("starting_weapon_2").value]
		stats[weap_2_stat] += 1

		var spirit_stat = spirit_stats[document.getElementById("starting_guardian_spirit").value]
		stats[spirit_stat] += 1
		
		console.log(stats)
		for (var attr in stats) {
				document.getElementById(attr).innerHTML = stats[attr]
		}
}
