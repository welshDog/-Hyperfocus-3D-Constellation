# 🤝 Contributing to Hyperfocus 3D Constellation

**Welcome to the most neurodivergent-friendly contributing guide on GitHub!**

We **love** contributions from everyone, especially the neurodivergent community. Every perspective makes this constellation brighter! ⭐

---

## 🧠 **ADHD-Friendly Quick Start** 

### **Got 5 Minutes?** ⏱️
1. **Fork** the repo (big green button)
2. **Clone** to your machine  
3. **Make** your change (any improvement counts!)
4. **Push** and create a pull request
5. **Celebrate** - you just made the galaxy better! 🎉

### **Need More Structure?** 📋
Follow the detailed guide below - it's organized in bite-sized chunks perfect for hyperfocus sessions.

---

## ✨ **Ways to Contribute**

### 🎨 **Visual & UI Improvements**
- New shader effects and animations
- Better color schemes for accessibility
- Improved mobile layouts
- Icon and graphic enhancements

### 🧠 **Accessibility Features** 
- Screen reader improvements
- Better keyboard navigation
- New neurodivergent-friendly features
- WCAG compliance enhancements

### 🔊 **Audio & Sound**
- Spatial audio improvements  
- New sound effects
- Binaural beats for focus
- Audio description features

### 📱 **Mobile & Touch**
- Better gesture recognition
- Touch interaction improvements
- Mobile performance optimization
- Responsive design enhancements

### 🌐 **Internationalization**
- Translation to other languages
- Cultural accessibility considerations
- Right-to-left language support

### 📚 **Documentation**
- Clearer setup instructions
- Better API documentation  
- Video tutorials
- Accessibility guides

### 🐛 **Bug Fixes**
- Performance issues
- Browser compatibility 
- Accessibility barriers
- Visual glitches

---

## 🎯 **Step-by-Step Contribution Process**

### **Step 1: Set Up Your Workspace** 🛠️

```bash
# Fork the repository on GitHub first!

# Clone your fork
git clone https://github.com/YOUR_USERNAME/hyperfocus-3d-constellation.git
cd hyperfocus-3d-constellation

# Add upstream remote for updates
git remote add upstream https://github.com/welshDog/hyperfocus-3d-constellation.git

# Create a feature branch
git checkout -b feature/your-awesome-improvement
```

### **Step 2: Make Your Changes** ✨

**Remember:**
- ✅ **Keep changes focused** - One improvement per PR works best for ADHD minds
- ✅ **Test accessibility** - Use keyboard navigation and screen readers
- ✅ **Check performance** - Test on slower devices if possible
- ✅ **Follow existing patterns** - Consistency helps everyone

### **Step 3: Test Your Work** 🧪

**Accessibility Testing:**
- [ ] **Keyboard Navigation** - Tab through all interactive elements
- [ ] **Screen Reader** - Use NVDA, JAWS, or VoiceOver to test
- [ ] **Color Contrast** - Check with WebAIM contrast checker
- [ ] **Motion Sensitivity** - Test with reduced motion enabled

**Cross-Browser Testing:**
- [ ] **Chrome/Chromium** - Primary development target
- [ ] **Firefox** - Important for web standards
- [ ] **Safari** - iOS/macOS compatibility  
- [ ] **Edge** - Windows user accessibility

### **Step 4: Submit Your Pull Request** 🚀

```bash
# Add your changes
git add .

# Commit with a clear message
git commit -m "✨ Add [feature]: Brief description of what you improved"

# Push to your fork
git push origin feature/your-awesome-improvement
```

**Create the PR on GitHub and include:**
- ✅ **Clear title** describing the improvement
- ✅ **What you changed** and why
- ✅ **Screenshots** if visual changes
- ✅ **Testing performed** (accessibility, browsers, devices)
- ✅ **Any breaking changes** (hopefully none!)

---

## 📝 **Commit Message Guidelines**

We use **easy-to-scan** commit prefixes perfect for ADHD minds:

- ✨ **feat:** New feature or enhancement
- 🐛 **fix:** Bug fix  
- 📚 **docs:** Documentation improvements
- 🎨 **style:** Code formatting, CSS changes
- ♿ **a11y:** Accessibility improvements
- ⚡ **perf:** Performance optimizations
- 🧪 **test:** Adding or updating tests
- 🔧 **config:** Configuration changes

**Example:**
```bash
git commit -m "✨ feat: Add voice search with spatial audio feedback"
git commit -m "♿ a11y: Improve screen reader support for repository details"  
git commit -m "🐛 fix: Resolve particle system memory leak on mobile"
```

---

## 🎨 **Code Style Guidelines**

### **JavaScript**
- Use **clear, descriptive names** - `repositoryOrb` not `ro`
- **Comment complex logic** - especially shader math
- **Prefer const/let** over var
- **Use semicolons** consistently
- **Group related functions** together

### **CSS**  
- Follow **existing CSS custom properties** pattern
- Use **BEM methodology** for class names
- **Comment accessibility-specific styles**
- **Group related properties** together
- **Mobile-first** responsive design

### **HTML**
- **Semantic elements** (nav, main, article, section)
- **ARIA labels** for all interactive elements  
- **Logical heading hierarchy** (h1 → h2 → h3)
- **Alt text** for all meaningful images
- **Skip links** for keyboard navigation

---

## ♿ **Accessibility Requirements**

**Every contribution MUST:**
- ✅ **Work with keyboard only** - no mouse required
- ✅ **Work with screen readers** - proper ARIA labeling  
- ✅ **Respect reduced motion** - provide alternatives
- ✅ **Meet color contrast** - 4.5:1 minimum ratio
- ✅ **Have focus indicators** - visible keyboard focus
- ✅ **Support zoom to 200%** - without breaking layout

**We especially love contributions that:**
- 💜 **Consider ADHD needs** - clear focus, reduced cognitive load
- 💜 **Help dyslexic users** - good typography, clear language
- 💜 **Support autism** - predictable interactions, sensory controls
- 💜 **Include everyone** - multiple ways to accomplish tasks

---

## 🧪 **Testing Guidelines**

### **Manual Testing Checklist**
- [ ] **Open app** in your target browser
- [ ] **Navigate with Tab key** - can you reach everything?
- [ ] **Try keyboard shortcuts** - do they work as expected?
- [ ] **Test on mobile** - touch gestures working?
- [ ] **Check performance** - smooth 60fps on your device?
- [ ] **Verify accessibility** - screen reader announces properly?

### **Automated Testing**
```bash
# Run accessibility tests (when available)
npm run test:a11y

# Check for console errors
# Open browser dev tools and look for red errors

# Performance testing
# Use browser dev tools Performance tab
```

---

## 🐛 **Reporting Issues**

### **Before Creating an Issue** 🔍
- **Search existing issues** - maybe it's already reported
- **Try in different browser** - is it browser-specific?
- **Check console for errors** - include any error messages
- **Test with clean cache** - clear browser cache first

### **Bug Report Template** 🐛
```markdown
**Describe the bug:**
Clear description of what's broken

**Steps to reproduce:**
1. Go to...
2. Click on...  
3. See error...

**Expected behavior:**
What should happen instead

**Screenshots:**
If helpful, add screenshots

**Environment:**
- Browser: Chrome 95
- OS: Windows 11
- Device: Desktop/Mobile
- Assistive tech: Screen reader name if applicable

**Accessibility impact:**
Does this affect users with disabilities?
```

### **Feature Request Template** ✨
```markdown
**Feature description:**
What would you like added?

**Problem it solves:**
What current pain point does this address?

**Neurodivergent benefit:**
How would this help ADHD/autistic/dyslexic users?

**Accessibility consideration:**
Any a11y aspects to consider?

**Alternative solutions:**
Other ways this could be implemented?
```

---

## 🌟 **Recognition**

**Contributors get:**
- ✅ **Name in contributors list** 
- ✅ **Shoutout in release notes**
- ✅ **Profile featured** in our community Discord
- ✅ **Special badge** for accessibility contributions
- ✅ **Eternal gratitude** from the neurodivergent community! 💜

**Major contributors may receive:**
- 🏆 **Collaborator status** 
- 🎁 **Hyperfocus Zone merchandise**
- 🌟 **Featured developer spotlight**
- 💬 **Direct line to project maintainers**

---

## 💬 **Getting Help**

### **Stuck? Don't worry!** 
- 💬 **Discord Community** - [Join here](https://discord.gg/ZKpHHrDctT) for real-time help
- 📧 **Direct Message** - Email welshdog@hyperfocuszone.com
- 💡 **GitHub Discussions** - For longer conversations
- 📝 **Create an Issue** - If you found a bug or need clarification

### **First-Time Contributors**
We **especially welcome** first-time contributors! Look for issues labeled:
- 🟢 **good first issue** - Perfect for getting started
- 🧠 **accessibility** - Neurodivergent perspective valuable  
- 📚 **documentation** - No coding required
- 🎨 **design** - Visual improvements needed

---

## 🎉 **Thank You!**

**Every contribution makes this constellation brighter.** ⭐

Whether you're:
- 🧠 **Neurodivergent** bringing lived experience
- ♿ **Accessibility expert** ensuring inclusion  
- 🎨 **Designer** making things beautiful
- 💻 **Developer** building new features
- 📚 **Writer** improving documentation
- 🧪 **Tester** finding bugs

**You're helping prove that different minds build better solutions!**

---

Built with 💜 by the neurodivergent community, for everyone who thinks differently.

**Ready to make the galaxy even more amazing?** 🚀