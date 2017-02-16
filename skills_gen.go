package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"text/template"
)

type skill struct {
	Name        string  `json:name`
	Cost        int     `json:cost`
	Description string  `json:decription`
	Passive     bool    `json:passive`
	Subskills   []skill `json:subskills`

	CodeName string
}

// We need a code name for each skill, for use as html id and JS variable.
// Generate these by lowercasing and replacing spaces with underscores.
// "My Cool Skill" -> "my_cool_skill"
func generateCodeNames(skills []skill) {
	for i := range skills {
		skills[i].CodeName = strings.Replace(strings.ToLower(skills[i].Name), " ", "_", -1)
		generateCodeNames(skills[i].Subskills)
	}
}

func main() {

	tmpl := template.Must(template.ParseFiles("skills.html.template"))

	file, err := os.Open("sword_skills.json")
	if err != nil {
		panic(err)
	}

	dec := json.NewDecoder(file)

	var skills []skill
	err = dec.Decode(&skills)
	if err != nil {
		panic(err)
	}

	generateCodeNames(skills)

	fmt.Println("<ul>")

	for i := range skills {
		err = tmpl.Execute(os.Stdout, skills[i])
		if err != nil {
			panic(err)
		}
	}

	fmt.Println("</ul>")
}
