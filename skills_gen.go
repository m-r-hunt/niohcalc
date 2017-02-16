package main

import "text/template"
import "encoding/json"
import "os"
import "strings"

type skill struct {
	Name        string `json:name`
	Code_name   string
	Cost        int     `json:cost`
	Description string  `json:decription`
	Passive     bool    `json:passive`
	Subskills   []skill `json:subskills`
}

func generate_code_names(skills []skill) {
	for i := range skills {
		skills[i].Code_name = strings.Replace(strings.ToLower(skills[i].Name), " ", "_", -1)
		generate_code_names(skills[i].Subskills)
	}
}

func main() {
	tmpl := template.Must(template.ParseFiles("skills.html.template"))
	file, _ := os.Open("sword_skills.json")
	dec := json.NewDecoder(file)
	var skills []skill
	err := dec.Decode(&skills)
	if err != nil {
		panic(err)
	}
	generate_code_names(skills)
	err = tmpl.Execute(os.Stdout, skills[0])
	if err != nil {
		panic(err)
	}
}
