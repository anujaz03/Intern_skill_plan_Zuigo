class AIAssistant:

    def __init__(self, name):
        self.name = name

    def capabilities(self):
        return [
            "Generate code",
            "Explain code",
            "Debug programs",
            "Write documentation",
            "Suggest improvements"
        ]

    def limitation(self):
        return (
            "AI should assist developers, "
            "but every generated line of code "
            "must be reviewed and understood."
        )


assistant = AIAssistant("ChatGPT")

print(f"Assistant : {assistant.name}\n")

print("Capabilities:")

for capability in assistant.capabilities():
    print(f"- {capability}")

print("\nImportant Note:")
print(assistant.limitation())