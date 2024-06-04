{ pkgs }: {
  # environment.systemPackages = [
  #   pkgs.nodejs_22
  # ];
  
  deps = [
    pkgs.nixos-rebuild 
    pkgs.swc
    pkgs.nodePackages.typescript-language-server
    pkgs.vscode-langservers-extracted
    pkgs.unzip
  ];
}