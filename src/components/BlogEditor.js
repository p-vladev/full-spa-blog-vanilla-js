import { api } from "../services/api";

export default class {

    btnHandler (id, type) {
        const el = document.getElementById(id);
        
        document.addEventListener("selectionchange", () => {
            document.queryCommandState(type) ? el.classList.add("active-btn") : el.classList.remove("active-btn");
        });

        el.addEventListener("click", () => {
            document.execCommand(type, false, null);
        });
    }

    HideTrigger (id, elToHideId) {
        const elToHide = document.getElementById(elToHideId);
        const el = document.getElementById(id);

        el.addEventListener("click", () => {
            elToHide.classList.toggle("hidden");
        });
    }
        
    advencedBtnHandler (id, elToHideId, type) {
        const elToHide = document.getElementById(elToHideId);
        const el = document.getElementById(id);

        document.addEventListener("selectionchange", () => {
            if (el.querySelector(".current-state-input")) {
                el.querySelector(".current-state-input").innerText = document.queryCommandValue(type);
            }
        });

        this.HideTrigger(id, elToHideId);

        elToHide.querySelectorAll("li").forEach(option => {
            option.addEventListener("mousedown", e => {
                e.preventDefault();

                const attributes = Array.from(e.target.attributes);
                const regex = /[data]+-[a-z]+|-[a-z]+/;

                const selected = attributes.find(atr => regex.test(atr.name));

                if (selected.name === "data-font-size") {
                    const specilalForFonts = `<span style="font-size: ${selected.value}px;">${window.getSelection().toString()}</span>`;

                    document.execCommand(type, false, specilalForFonts);

                    this.HideTrigger(id, elToHideId);

                    return;
                }

                document.execCommand(type, false, selected.value);

                this.HideTrigger(id, elToHideId);
            });
        });
    }

    ColorsListRender (className) {
        const colors = [
            "#000000", "#000080", "#0000FF", "#008080", "#00FFFF",
            "#800000", "#FF0000", "#FFFF00", "#00FF00", "#008000",
            "#FF00FF", "#800080", "#808000", "#C0C0C0", "#FFFFFF"
        ];

        let html = ``;

        colors.forEach(color => {
            html += `<li class="${className}" style="background-color: ${color};" data-color="${color}"></li>`;
        });

        return html;
    }

    FontSizesListRender () {
        const fontSizes = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];

        let html = ``;

        fontSizes.forEach(size => {
            html += `<li class="font-size-option" data-font-size="${size}">${size}</li>`;
        });

        return html;
    }

    FontNamesListRender () {
        const fontNames = [
            "Arial", "Verdana", "Helvetica", 
            "Times New Roman", "Courier New", "Georgia", 
            "Palatino", "Garamond", "Bookman", 
            "Comic Sans MS", "Trebuchet MS", "Arial Black", "Impact"
        ];
        
        let html = ``;

        fontNames.forEach(name => {
            html += `<li class="font-name-option" data-font-name="${name}" style="font-family: ${name};">${name}</li>`;
        });

        return html;
    }

    async render() {

        return `
            <div id="blog-editor" class="blog-editor" style="max-width: 75%;">
                <header id="blog-editor-header" class="blog-editor-header">
                    <input id="blog-title" class="blog-title" type="text" placeholder="Blog Title"/>
                </header>
                <div class="formatting-toolbar">
                    <div id="font-name" class="dropdown">
                        <div id="font-name-btn" class="format-btn" style="width: 100px; overflow: hidden; white-space: nowrap; padding-left: 20px;"><div class="current-state-input"></div></div>
                        <div id="font-name-input" class="font-name-options hidden dropdown-menu">
                            <ul class="font-name-picker dropdown-list">
                                ${this.FontNamesListRender()}
                            </ul>
                        </div>
                    </div>

                    <div id="font-size" class="font-size dropdown">
                        <div id="font-size-btn" class="format-btn font-size-btn"><div class="current-state-input"></div></div>

                        <div id="font-size-input" class="font-size-options hidden dropdown-menu">
                            <ul class="font-size-picker dropdown-list">
                                ${this.FontSizesListRender()}
                            </ul>
                        </div>
                    </div>

                    <div id="bold-btn" class="format-btn bold-btn">B</div>
                    <div id="italic-btn" class="format-btn italic-btn">I</div>
                    <div id="underline-btn" class="format-btn underline-btn">U</div>
                    
                    <div id="text-color" class="dropdown">
                        <div id="text-color-btn" class="format-btn">A</div>
                        <div id="text-color-input" class="color-options hidden dropdown-menu">
                            <ul class="color-picker dropdown-list">
                                ${this.ColorsListRender("color-option")}
                                <li class="color-option" style="background: linear-gradient(to right, #FF0000, #FFFF00, #3131ff);"></li>
                            </ul>
                        </div>
                    </div>

                    <div id="back-text-color" class="dropdown">
                        <div id="back-text-color-btn" class="format-btn">A</div>
                        <div id="back-text-color-input" class="color-options hidden dropdown-menu">
                            <ul class="back-color-picker dropdown-list">
                                ${this.ColorsListRender("back-color-option")}
                                <li class="back-color-option" style="background: linear-gradient(to right, #FF0000, #FFFF00, #3131ff);"></li>
                            </ul>
                        </div>
                    </div>

                    <!-- <div class="justify-txt dropdown"> -->
                    <!--     <div id="justify-txt-btn" class="format-btn">Txt</div> -->
                    <!--     <div id="justify-txt-input" class="justify-txt-options hidden dropdown-menu"> -->
                            <!-- <ul class="justify-txt-picker dropdown-list"> -->
                                <div id="justify-txt-left-btn" class="format-btn">L</div>
                                <div id="justify-txt-center-btn" class="format-btn">C</div>
                                <div id="justify-txt-right-btn" class="format-btn">R</div>
                                <div id="justify-txt-full-btn" class="format-btn">F</div>
                    <!--         </ul> -->
                    <!--     </div> -->
                    <!-- </div> -->

                </div>
                <div id="blog-content" class="blog-content" contenteditable="true">
                
                </div>
            </div>
        `;
    }
    
    async after_render (methodFunction, blog) {
        const submitBtn = `<button id="submit-btn" class="white-rounded-btn">${blog ? "Edit" : "Post"}</button>`;
        const deleteBtn = blog ? `<button id="delete-btn" class="white-rounded-btn">Delete</button>` : ``;
        const blogEditorHeader = document.getElementById("blog-editor-header");

        const btns = document.createElement("div");
        btns.innerHTML = `${submitBtn} ${deleteBtn}`;

        blogEditorHeader.appendChild(btns);

        if (blog) {
            document.getElementById("blog-title").value = blog.blogTitle;
            document.getElementById("blog-content").innerHTML = blog.text;
        }

        document.getElementById("delete-btn")?.addEventListener("click", async () => {
            const confirmDelete = confirm("Are you sure you want to delete this blog?");
            
            if (confirmDelete) {
                await api.DeleteData(`/blogs/${blog.id}`);
                alert("Blog deleted successfully!");
                router.NavigateTo("/profile");
            }
        });

        
        this.btnHandler("bold-btn", "bold");
        this.btnHandler("italic-btn", "italic");
        this.btnHandler("underline-btn", "underline");

        // this.HideTrigger("justify-txt-btn", "justify-txt-input");

        this.btnHandler("justify-txt-left-btn", "justifyLeft");
        this.btnHandler("justify-txt-center-btn", "justifyCenter");
        this.btnHandler("justify-txt-right-btn", "justifyRight");
        this.btnHandler("justify-txt-full-btn", "justifyFull");

        this.advencedBtnHandler("text-color-btn", "text-color-input", "foreColor");
        this.advencedBtnHandler("back-text-color-btn", "back-text-color-input", "backColor");
        this.advencedBtnHandler("font-name-btn", "font-name-input", "fontName");

        document.addEventListener("selectionchange", () => {
            if (document.getElementById("font-size-btn").querySelector(".current-state-input")) {

                const selection = window.getSelection();

                if (selection.focusNode.parentElement?.id !== "blog-content") return;
    
                if (!selection || selection.rangeCount === 0) return null;

                let node = selection.anchorNode;

                if (node.nodeType === 3) {
                    node = node.parentElement;
                }

                const computedStyle = window.getComputedStyle(node);

                document.getElementById("font-size-btn").querySelector(".current-state-input").innerText =  computedStyle.fontSize;
            }
        });

        this.HideTrigger("font-size-btn", "font-size-input");

        document.getElementById("font-size-input").querySelectorAll("li").forEach(option => {
            option.addEventListener("mousedown", e => {
                e.preventDefault();

                const attributes = Array.from(e.target.attributes);
                const regex = /[data]+-[a-z]+|-[a-z]+/;

                const selected = attributes.find(atr => regex.test(atr.name));

                const specilalForFonts = `<span style="font-size: ${selected.value}px;">${window.getSelection().toString()}</span>`;

                document.execCommand("insertHTML", false, specilalForFonts);

                // this.HideTrigger("font-size-btn", "font-size-input");

                document.getElementById("font-size-input").classList.add("hidden");

                return;
            });
        });

        document.getElementById("submit-btn").addEventListener("click", e => {
            e.preventDefault();

            const blogTitle = document.getElementById("blog-title").value;
            const blogContent = document.getElementById("blog-content").innerHTML;

            if (blogTitle === "" || blogContent === "") return;

            methodFunction(blogTitle, blogContent);
        });
    }
}