import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GlossaryModal from "../GlossaryModal";

describe("GlossaryModal", () => {
  let mockEscapeEvent: KeyboardEvent;

  beforeEach(() => {
    mockEscapeEvent = new KeyboardEvent("keydown", {
      key: "Escape",
      bubbles: true,
    });
  });

  it("renders nothing when isOpen is false", () => {
    const { container } = render(<GlossaryModal isOpen={false} onClose={vi.fn()} />);
    
    expect(container).toBeEmptyDOMElement();
  });

  it("renders modal when isOpen is true", () => {
    render(<GlossaryModal isOpen={true} onClose={vi.fn()} />);
    
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /calendar glossary/i })).toBeInTheDocument();
  });

  it("displays glossary terms", () => {
    render(<GlossaryModal isOpen={true} onClose={vi.fn()} />);
    
    expect(screen.getByText("Tonalpohualli")).toBeInTheDocument();
    expect(screen.getByText("Xiuhpohualli")).toBeInTheDocument();
    expect(screen.getByText("Trecena")).toBeInTheDocument();
    expect(screen.getByText("Nemontemi")).toBeInTheDocument();
  });

  it("displays pronunciations for terms", () => {
    render(<GlossaryModal isOpen={true} onClose={vi.fn()} />);
    
    expect(screen.getByText(/toh-nahl-poh-WAH-lee/i)).toBeInTheDocument();
    expect(screen.getByText(/shee-oo-poh-WAH-lee/i)).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<GlossaryModal isOpen={true} onClose={onClose} />);
    
    const closeButton = screen.getAllByRole("button", { name: /close/i })[0];
    await user.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when bottom close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<GlossaryModal isOpen={true} onClose={onClose} />);
    
    const closeButton = screen.getByRole("button", { name: /close glossary/i });
    await user.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("has proper ARIA attributes", () => {
    render(<GlossaryModal isOpen={true} onClose={vi.fn()} />);
    
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "glossary-title");
  });

  it("prevents body scrolling when open", () => {
    const { rerender } = render(<GlossaryModal isOpen={true} onClose={vi.fn()} />);
    
    expect(document.body.style.overflow).toBe("hidden");
    
    rerender(<GlossaryModal isOpen={false} onClose={vi.fn()} />);
    
    expect(document.body.style.overflow).toBe("unset");
  });

  it("is scrollable when content overflows", () => {
    render(<GlossaryModal isOpen={true} onClose={vi.fn()} />);
    
    const scrollableArea = screen.getByRole("dialog").querySelector(".overflow-y-auto");
    expect(scrollableArea).toBeInTheDocument();
  });
});
